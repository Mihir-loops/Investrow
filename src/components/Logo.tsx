import { Link } from "react-router-dom";

export function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand--light" : ""} ${className}`.trim()}
      aria-label="Investrow Financial Services — home"
    >
      <svg
        className="brand__mark"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1.25"
          y="1.25"
          width="33.5"
          height="33.5"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M8.5 25.5L14.7 18.8L19 22.6L27.2 12.4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="27.2" cy="12.4" r="2.2" fill="#D7F36A" />
      </svg>
      <span className="brand__type">
        <span className="brand__name">
          Investrow<span className="brand__dot">.</span>
        </span>
        <span className="brand__sub">Financial Services</span>
      </span>
    </Link>
  );
}
