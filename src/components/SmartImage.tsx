import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  eager?: boolean;
  sizes?: string;
  /** Set to "high" on the above-fold LCP image so the browser fetches it first. */
  fetchPriority?: "high" | "low" | "auto";
};

export function SmartImage({
  src,
  alt,
  className = "",
  width,
  height,
  eager = false,
  sizes,
  fetchPriority,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? "/assets/fallback.svg" : src}
      alt={alt}
      className={`${className} ${failed ? "is-fallback" : ""}`.trim()}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchPriority={fetchPriority as any}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
