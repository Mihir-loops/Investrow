import {
  isValidElement,
  cloneElement,
  type ReactNode,
  type ElementType,
  type CSSProperties,
  useMemo,
} from "react";
import { useInView } from "../hooks/useReveal";

export type TextRevealMode = "words" | "chars" | "letters" | "blur-fade" | "lines";

export interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  mode?: TextRevealMode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
  immediate?: boolean;
}

/**
 * Extracts plain text from a ReactNode tree for accessibility (aria-label).
 */
function extractPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join("");
  }
  if (isValidElement(node) && node.props && "children" in node.props) {
    return extractPlainText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * Splits children into words wrapped with masked reveal containers.
 */
function renderWords(
  node: ReactNode,
  state: { count: number },
  keyPrefix = "w"
): ReactNode {
  if (typeof node === "string") {
    // Split by whitespace keeping spaces as separators
    const tokens = node.split(/(\s+)/);
    return tokens.map((token, i) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) {
        return " ";
      }
      const index = state.count++;
      return (
        <span className="scrolly-word-mask" key={`${keyPrefix}-${i}-${index}`}>
          <span
            className="scrolly-word-inner"
            style={{ "--word-index": index } as CSSProperties}
          >
            {token}
          </span>
        </span>
      );
    });
  }

  if (typeof node === "number") {
    const index = state.count++;
    return (
      <span className="scrolly-word-mask" key={`${keyPrefix}-${index}`}>
        <span
          className="scrolly-word-inner"
          style={{ "--word-index": index } as CSSProperties}
        >
          {node}
        </span>
      </span>
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => renderWords(child, state, `${keyPrefix}-${i}`));
  }

  if (isValidElement(node)) {
    if (node.type === "br") {
      return cloneElement(node);
    }

    if (node.props && "children" in node.props) {
      const childContent = (node.props as { children?: ReactNode }).children;
      return cloneElement(
        node,
        { ...node.props, key: node.key ?? `${keyPrefix}-elem` },
        renderWords(childContent, state, `${keyPrefix}-c`)
      );
    }
  }

  return node;
}

/**
 * Splits children into characters grouped by words to prevent awkward line breaks.
 */
function renderChars(
  node: ReactNode,
  state: { count: number },
  keyPrefix = "ch"
): ReactNode {
  if (typeof node === "string") {
    const words = node.split(/(\s+)/);
    return words.map((word, wIdx) => {
      if (word === "") return null;
      if (/^\s+$/.test(word)) {
        return " ";
      }
      return (
        <span className="scrolly-word-group" key={`${keyPrefix}-w-${wIdx}`}>
          {Array.from(word).map((char, cIdx) => {
            const index = state.count++;
            return (
              <span className="scrolly-char-mask" key={`${keyPrefix}-${wIdx}-${cIdx}-${index}`}>
                <span
                  className="scrolly-char-inner"
                  style={{ "--char-index": index } as CSSProperties}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      );
    });
  }

  if (typeof node === "number") {
    return renderChars(String(node), state, keyPrefix);
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => renderChars(child, state, `${keyPrefix}-${i}`));
  }

  if (isValidElement(node)) {
    if (node.type === "br") {
      return cloneElement(node);
    }

    if (node.props && "children" in node.props) {
      const childContent = (node.props as { children?: ReactNode }).children;
      return cloneElement(
        node,
        { ...node.props, key: node.key ?? `${keyPrefix}-elem` },
        renderChars(childContent, state, `${keyPrefix}-c`)
      );
    }
  }

  return node;
}

/**
 * Splits children into atmospheric blur-fade word tokens.
 */
function renderBlurFade(
  node: ReactNode,
  state: { count: number },
  keyPrefix = "bf"
): ReactNode {
  if (typeof node === "string") {
    const tokens = node.split(/(\s+)/);
    return tokens.map((token, i) => {
      if (token === "") return null;
      if (/^\s+$/.test(token)) {
        return " ";
      }
      const index = state.count++;
      return (
        <span
          className="scrolly-blur-word"
          key={`${keyPrefix}-${i}-${index}`}
          style={{ "--word-index": index } as CSSProperties}
        >
          {token}
        </span>
      );
    });
  }

  if (typeof node === "number") {
    const index = state.count++;
    return (
      <span
        className="scrolly-blur-word"
        key={`${keyPrefix}-${index}`}
        style={{ "--word-index": index } as CSSProperties}
      >
        {node}
      </span>
    );
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => renderBlurFade(child, state, `${keyPrefix}-${i}`));
  }

  if (isValidElement(node)) {
    if (node.type === "br") {
      return cloneElement(node);
    }

    if (node.props && "children" in node.props) {
      const childContent = (node.props as { children?: ReactNode }).children;
      return cloneElement(
        node,
        { ...node.props, key: node.key ?? `${keyPrefix}-elem` },
        renderBlurFade(childContent, state, `${keyPrefix}-c`)
      );
    }
  }

  return node;
}

/**
 * TextReveal - Award-winning scrollytelling text reveal component.
 * Supports:
 * - 'words': masked slide-up per word with inertia and stagger
 * - 'chars' | 'letters': letter-by-letter drop-in with crisp character stagger
 * - 'blur-fade': atmospheric focus reveal from deep blur
 * - 'lines': line-by-line masked rise
 * Fully accessible via aria-label + aria-hidden visual layer.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  mode = "words",
  className = "",
  delay = 0,
  threshold = 0.12,
  rootMargin = "0px 0px -5% 0px",
  style,
  immediate = false,
}: TextRevealProps) {
  const { ref, inView: observedInView } = useInView<HTMLElement>({
    threshold,
    rootMargin,
    once: true,
  });

  const inView = immediate || observedInView;

  const fullText = useMemo(() => extractPlainText(children).trim(), [children]);

  const animatedContent = useMemo(() => {
    const state = { count: 0 };
    if (mode === "chars" || mode === "letters") {
      return renderChars(children, state);
    }
    if (mode === "blur-fade") {
      return renderBlurFade(children, state);
    }
    return renderWords(children, state);
  }, [children, mode]);

  const normalizedMode = mode === "letters" ? "chars" : mode;

  return (
    <Tag
      ref={ref}
      data-text-reveal={normalizedMode}
      className={`scrolly-text ${inView ? "is-visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          "--reveal-base-delay": `${delay}ms`,
        } as CSSProperties
      }
      aria-label={fullText || undefined}
    >
      <span aria-hidden="true" className="scrolly-text-content">
        {animatedContent}
      </span>
    </Tag>
  );
}
