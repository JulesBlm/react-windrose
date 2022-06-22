/*
 * Allow other letters for cardinal directions, but suggest the defaults in typescript
 * Infer bin titles and trickle them down
 * // import { useMemo } from "react";
 * Get rid of Magic Numbers!
 *
 * Make Windrose slotted so user can compose their own?
 */
import {
  scaleLinear,
  scaleOrdinal,
  scaleBand,
  type ScaleOrdinal,
  type ScaleLinear,
  type ScaleBand,
} from "d3-scale";
import { arc, stack, type Series, type SeriesPoint } from "d3-shape";
import { max, range } from "d3-array";

export const cardinalDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
] as const;

type CardinalDirection = typeof cardinalDirections[number];

const testBins = ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7+"] as const;
type TestBins = typeof testBins;

type BinKeys<Bins extends readonly string[] | string[] = TestBins> = {
  [Bin in Bins[number]]: number;
};

type WindroseDataPointProps = {
  angle: CardinalDirection;
  total: number;
};

type WindroseDataPoint = WindroseDataPointProps & BinKeys;

type RingProps = {
  d:  Series<WindroseDataPoint, string>;
  angleOffset: number;
  fill: string;
  makeArc: any; // TODO
};

function Ring({ d, angleOffset, fill, makeArc }: RingProps) {
  return (
    <g className="ring" fill={fill}>
      {d.map((e: any) => (
        <path
          key={angleOffset}
          d={makeArc(e)}
          transform={`rotate(${angleOffset})`}
        />
      ))}
    </g>
  );
}

export type LegendProps = {
  bins: string[];
  binsTitle: string;
  binUnits: string;
  colorScale: ScaleOrdinal<string, string, never>;
  outerRadius: number;
};

function Legend({
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

type YTicksProps = {
  yTicks: number[];
  y: ScaleLinear<number, number>;
  outerRadius: number;
  yUnits: string;
};

function YTicks({ yTicks, y, outerRadius, yUnits }: YTicksProps) {
  return (
    <g
      className="y-ticks"
      textAnchor="middle"
      fontFamily="sans-serif"
      fontSize={18}
    >
      {yTicks.map((tick) => (
        <g className="y-circle-tick" key={tick}>
          <circle fill="none" stroke="gray" strokeDasharray="4,4" r={y(tick)} />
          <text
            y={-y(tick)}
            dy="-0.35em"
            x={-8}
            paintOrder="stroke"
            strokeWidth="1.4px"
            stroke="white"
          >
            {tick}
          </text>
        </g>
      ))}

      <text
        y={-outerRadius + 22} // whats this 22 for?
        x={30}
        fontSize={18}
        paintOrder="stroke"
        strokeWidth="1.4px"
        stroke="white"
        id="yUnitsText"
      >
        {yUnits}
      </text>
    </g>
  );
}

export type LabelProps = {
  d: any;
  angleOffset: number;
  x: any;
  outerRadius: number;
  textAnchor?: "start" | "middle" | "end"; // get from DOM types?
};

export function Label({
  d,
  angleOffset,
  x,
  outerRadius,
  textAnchor = "middle",
}: LabelProps) {
  const isInLeftHalf = (d: any) =>
    (x(d.angle) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI;

  const transformLabelText = isInLeftHalf(d)
    ? "rotate(90) translate(0,6)" // why the 6?
    : "rotate(-90) translate(0,6)";

  return (
    <g
      className="label"
      textAnchor={textAnchor}
      transform={`rotate(${
        ((x(d.angle) + x.bandwidth() / 2) * 180) / Math.PI - (90 - angleOffset)
      }) translate(${outerRadius + 30},0)`} // TODO extract these to variables
    >
      <text transform={transformLabelText}>{d.angle}</text>
    </g>
  );
}

type DirectionLabelsProps = {
  angleOffset: number;
  outerRadius: number;
  x: ScaleBand<string>;
  data: WindroseDataPoint[];
  fontWeight?: number;
  fontSize?: number;
  // Add remaining group props?
};

function DirectionLabels({
  angleOffset,
  outerRadius,
  x,
  data,
  fontWeight = 600,
  fontSize = 16,
}: DirectionLabelsProps) {
  return (
    <g
      className="direction-labels"
      fontFamily="sans-serif"
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {data.map((d, i) => (
        <Label
          key={i}
          d={d}
          angleOffset={angleOffset}
          x={x}
          outerRadius={outerRadius}
        />
      ))}
    </g>
  );
}

export type WindRoseProps = {
  width: number;
  height: number;
  binsTitle: string;
  data: WindroseDataPoint[]; // make generic for bins better yet infer from bins
  bins: string[];
  binUnits: string;
  yUnits: string;
  colorSchemeColors: string[];
  margin?: number;
  nrOfYTicks?: number;
  innerRadius?: number;
  padAngle?: number;
};

export function WindRose({
  width,
  height,
  binsTitle = "",
  data,
  bins,
  binUnits,
  yUnits,
  colorSchemeColors,
  margin = 20,
  innerRadius = 30,
  nrOfYTicks = 5,
  padAngle = 0.2,
}: WindRoseProps) {
  const outerRadius = Math.min(width, height) / 2;

  const maxY = max(data, (d) => d.total);
  const y = scaleLinear()
    .domain([0, maxY!] as const)
    .range([innerRadius, outerRadius]);

  type Bin = typeof bins[number];

  const colorScale = scaleOrdinal<Bin>().domain(bins).range(colorSchemeColors);

  // the x scale is for the position of the bars along the circle, one full turn
  const x = scaleBand()
    .domain(data.map((d) => d.angle))
    .range([0, 2 * Math.PI])
    .align(0);

  type SerieWindrose = SeriesPoint<WindroseDataPoint>;

  const makeArc = arc<SerieWindrose>()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(d.data.angle))
    .endAngle((d) => x(d.data.angle) + x.bandwidth())
    .padAngle(padAngle)
    .padRadius(innerRadius);

  const yTicks = y.ticks(nrOfYTicks);

  // const tickFormat = y.tickFormat(x => `${x}\%`);
  const stackedData = stack<WindroseDataPoint>().keys(bins)(data);
  const angleOffset = -360 / data.length / 2; // to shift each bar to middle of line
  const yLineStep = 360 / data.length;

  return (
    <svg
      viewBox={`0, 0, ${width + margin}, ${height + margin}`}
      // width={width}
      // height={height}
      id="windrose"
    >
      <g transform={`translate(${width / 2},${height / 2})`}>
        <g className="axes">
          {range(0, 360, yLineStep).map((d) => (
            <line
              key={d}
              x1={innerRadius}
              x2={y(yTicks.reverse()[0])} // to the last tick circle
              transform={`rotate(${d - 90})`}
              fill="none"
              stroke="gray"
              stroke-dasharray="1,4"
            />
          ))}
        </g>

        <g className="rings">
          {stackedData.map((d) => (
            <Ring
              key={d.key}
              d={d}
              angleOffset={angleOffset}
              fill={colorScale(d.key)}
              makeArc={makeArc}
            />
          ))}
        </g>

        <DirectionLabels
          x={x}
          angleOffset={angleOffset}
          data={data}
          outerRadius={outerRadius}
        />

        <YTicks
          y={y}
          outerRadius={outerRadius}
          yTicks={yTicks}
          yUnits={yUnits}
        />

        <Legend
          bins={bins}
          binsTitle={binsTitle}
          colorScale={colorScale}
          outerRadius={outerRadius}
          binUnits={binUnits}
        />
      </g>
    </svg>
  );
}

export default WindRose;
