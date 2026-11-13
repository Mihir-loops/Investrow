import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { inr, toNumber } from "../lib/format";
import { playTick } from "../lib/audio";

export function NumberField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  const [text, setText] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setText(String(value));
    }
  }, [value]);

  const commit = () => {
    const parsed = toNumber(text, value);
    const next = Math.min(max, Math.max(min, parsed));
    onChange(next);
    setText(String(next));
  };

  const clamped = Math.min(max, Math.max(min, value));
  const progress = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  return (
    <div className="field">
      <div className="field__head">
        <label htmlFor={id}>{label}</label>
        <div className="field__control">
          {prefix && <span className="field__affix">{prefix}</span>}
          <input
            ref={inputRef}
            id={id}
            type="number"
            inputMode="numeric"
            value={text}
            min={min}
            max={max}
            step={step}
            onChange={(event) => {
              const raw = event.target.value;
              setText(raw);
              if (raw === "") return;
              const parsed = Number(raw);
              if (Number.isFinite(parsed)) onChange(parsed);
            }}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
          />
          {suffix && <span className="field__affix">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        className="field__range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(event) => {
          onChange(Number(event.target.value));
          playTick();
        }}
        aria-label={`${label} slider`}
        style={{ "--range-progress": `${progress}%` } as CSSProperties}
      />
      <div className="field__scale" aria-hidden="true">
        <span>
          {prefix === "₹" ? inr(min) : `${min}${suffix ? ` ${suffix}` : ""}`}
        </span>
        <span>
          {prefix === "₹" ? inr(max) : `${max}${suffix ? ` ${suffix}` : ""}`}
        </span>
      </div>
      {hint && <p className="field__hint">{hint}</p>}
    </div>
  );
}

export function SegmentedField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="field field--segmented">
      <legend>{label}</legend>
      <div className="segmented">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? "is-active" : ""}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ResultHero({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="result-hero">
      <p>{label}</p>
      <strong>{value}</strong>
      {note && <span>{note}</span>}
    </div>
  );
}

export function ResultGrid({
  items,
}: {
  items: { label: string; value: string; tone?: "default" | "accent" }[];
}) {
  return (
    <dl className="result-grid">
      {items.map((item) => (
        <div
          key={item.label}
          className={item.tone === "accent" ? "result-grid__item is-accent" : "result-grid__item"}
        >
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CalculatorNote({
  title = "Assumptions",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="calc-note">
      <Icon name="info" size={18} />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="calc-reset" onClick={onClick}>
      <Icon name="repeat" size={15} /> Reset values
    </button>
  );
}
