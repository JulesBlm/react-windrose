import { type ScaleOrdinal } from "d3-scale";

export interface LegendProps {
  bins: Array<string>;
  binsTitle: string;
  binUnits: string;
  colorScale: ScaleOrdinal<string, string, never>;
  outerRadius: number;
}

export function Legend({
  bins,
  binsTitle,
  binUnits,
  colorScale,
  outerRadius,
}: LegendProps) {
  const fill = colorScale(bins[0]);

  // A LOT OF MAGIC NUBMERS
  return (
    <g className="legend" transform={`translate(${outerRadius - 10},0)`}>
      <text
        textDecoration="underline"
        textAnchor="end"
        transform={`translate(40,${-outerRadius - 30})`}
      >
        {binsTitle} {binUnits ? `(${binUnits})` : null}
      </text>
      {[...bins].reverse().map((legendEntry, i) => (
        <g
          transform={`translate(0,${-outerRadius - 25 + i * 20})`}
          key={legendEntry}
        >
          <rect
            fill={fill}
            // make these customizable
            width={18}
            height={18}
            stroke="dimgray"
            strokeWidth={0.5}
          />
          <text x={24} y={9} dy="0.35em" fontFamily="sans-serif" fontSize={13}>
            {legendEntry}
          </text>
        </g>
      ))}
    </g>
  );
}
