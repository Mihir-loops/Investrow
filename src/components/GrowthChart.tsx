import { compactINR, inr } from "../lib/format";

export type ChartSeries = {
  label: string;
  color: string;
  values: { x: number; y: number }[];
  dashed?: boolean;
  area?: boolean;
};

const WIDTH = 720;
const HEIGHT = 260;
const PAD = { top: 18, right: 16, bottom: 34, left: 64 };

function smoothPath(points: { px: number; py: number }[]) {
  if (points.length === 0) return "";
  let path = `M ${points[0].px} ${points[0].py}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midX = (previous.px + current.px) / 2;
    path += ` C ${midX} ${previous.py}, ${midX} ${current.py}, ${current.px} ${current.py}`;
  }
  return path;
}

export function GrowthChart({
  series,
  xSuffix = "yr",
  ariaLabel,
  formatValue = compactINR,
}: {
  series: ChartSeries[];
  xSuffix?: string;
  ariaLabel: string;
  formatValue?: (value: number) => string;
}) {
  const allPoints = series.flatMap((item) => item.values);
  if (allPoints.length === 0) return null;

  const xValues = allPoints.map((point) => point.x);
  const yValues = allPoints.map((point) => point.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const maxY = Math.max(...yValues, 1);
  const xSpan = Math.max(1, maxX - minX);
  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;

  const xScale = (x: number) =>
    PAD.left + ((x - minX) / xSpan) * plotWidth;
  const yScale = (y: number) =>
    PAD.top + plotHeight - (y / maxY) * plotHeight;

  const ticks = Array.from({ length: 5 }, (_, index) => {
    const value = (maxY / 4) * index;
    return {
      value,
      y: yScale(value),
    };
  });

  const xTickCount = Math.min(6, Math.max(2, Math.round(xSpan)));
  const xTicks = Array.from({ length: xTickCount }, (_, index) => {
    const value = minX + (xSpan / (xTickCount - 1)) * index;
    return { value, x: xScale(value) };
  });

  const signature = series
    .map((item) =>
      item.values.map((point) => `${Math.round(point.x)}:${Math.round(point.y)}`).join(","),
    )
    .join("|");

  return (
    <div className="chart">
      <div className="chart__legend" aria-hidden="true">
        {series.map((item) => (
          <span key={item.label} className="chart__legend-item">
            <span
              className="chart__swatch"
              style={{
                background: item.color,
                opacity: item.dashed ? 0.6 : 1,
              }}
            />
            {item.label}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="chart__svg"
        role="img"
        aria-label={ariaLabel}
      >
        <g key={signature} className="chart__update">
          {ticks.map((tick) => (
            <g key={tick.y}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={tick.y}
                y2={tick.y}
                className="chart__grid"
              />
              <text
                x={PAD.left - 12}
                y={tick.y + 4}
                textAnchor="end"
                className="chart__label"
              >
                {formatValue(tick.value)}
              </text>
            </g>
          ))}
          {xTicks.map((tick) => (
            <text
              key={tick.x}
              x={tick.x}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="chart__label"
            >
              {Math.round(tick.value)}
              {xSuffix}
            </text>
          ))}
          {series.map((item) => {
            const points = item.values.map((point) => ({
              px: xScale(point.x),
              py: yScale(point.y),
            }));
            const line = smoothPath(points);
            const area = `${line} L ${points[points.length - 1].px} ${PAD.top + plotHeight} L ${points[0].px} ${PAD.top + plotHeight} Z`;
            return (
              <g key={item.label}>
                {item.area !== false && (
                  <path
                    d={area}
                    fill={item.color}
                    opacity={0.08}
                    className="chart__area"
                  />
                )}
                <path
                  d={line}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeDasharray={item.dashed ? "7 7" : undefined}
                  className="chart__line"
                />
              </g>
            );
          })}
        </g>
      </svg>
      <p className="sr-only">
        {ariaLabel}. {series.map((item) => `${item.label} ends at ${inr(item.values[item.values.length - 1]?.y ?? 0)}.`).join(" ")}
      </p>
    </div>
  );
}
