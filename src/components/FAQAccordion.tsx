import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function FAQAccordion({
  items,
  defaultOpen = 0,
}: {
  items: { question: string; answer: ReactNode }[];
  defaultOpen?: number | null;
}) {
  const [openItems, setOpenItems] = useState<number[]>(
    defaultOpen === null ? [] : [defaultOpen],
  );
  const baseId = useId();

  const toggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openItems.includes(index);
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div className={`accordion__item ${open ? "is-open" : ""}`} key={item.question}>
            <h3 className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="accordion__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="accordion__question">{item.question}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <Icon name="chevronDown" size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion__panel"
              data-open={open}
              aria-hidden={!open}
            >
              <div className="accordion__answer">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
