import { useMemo, type ReactNode, type SVGProps } from "react";
import { DirectionLabels } from "./labels.js";
import { Ring } from "./ring.js";
import { RadialLines } from "./radial-lines.js";
import { Tick } from "./ticks.js";
import type { WindroseDataPoint } from "./types.js";
import { useWindRose } from "./use-windrose.js";
import { blueColorScheme, fluidFontSize, sumRow } from "./util.js";

const directionAccessor = (d: { direction: string }) => d.direction;

/**
 * Props for the WindRose component that renders a wind rose chart
 * @template TBins - Type of the bins array
 * @template TDirections - Type of the directions array
 * @ignore SVGProps<SVGSVGElement>
 */
export interface WindRoseProps<
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string> = ReadonlyArray<string>,
> extends SVGProps<SVGSVGElement> {
  /** Width of the SVG in pixels */
  width: number;
  /** Height of the SVG in pixels */
  height: number;
  /** Array of data points for the wind rose chart */
  data: Array<WindroseDataPoint<TBins[number], TDirections[number]>>;
  /** Array of bin labels for the wind rose segments */
  bins: TBins;
  /** Array of colors to use for the wind rose segments */
  colorScheme: ReadonlyArray<string>;
  /** Units to display on the y-axis */
  yUnits?: string;
  /** Number of tick marks to display (default: 4) */
  tickCount?: number;
  /** Outer radius of the wind rose chart (default: min(width, height) / 2.5) */
  outerRadius?: number;
  /** Inner radius of the wind rose chart (default: 20) */
  innerRadius?: number;
  /** Array of direction labels to display (defaults to unique directions from data) */
  labelDirections?: Array<string>;
  /** Angle padding between segments in radians (default: 0.05) */
  padAngle?: number;
  /** Maximum value for the y-axis scale (defaults to maximum value in data) */
  maxY?: number;
  /** Optional children to render inside the SVG */
  children?: ReactNode;
}

/**
 * Renders a wind rose chart showing the distribution of wind speed and direction
 * @template TBins - Type of the bins array
 * @template TDirections - Type of the directions array
 * @param props - The component props
 * @returns An SVG element containing the wind rose chart
 */
export function WindRose<
  TBins extends ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string>,
>({
  width,
  height,
  data,
  bins,
  yUnits,
  colorScheme = blueColorScheme,
  labelDirections,
  innerRadius = 20,
  outerRadius = Math.min(width, height) / 2.5,
  tickCount = 4,
  padAngle = 0.05,
  maxY,
  children,
  ...props
}: WindRoseProps<TBins, TDirections>) {
  const dataDirections = useMemo(() => data.map(directionAccessor), [data]);

  const dataWithRowTotals = useMemo(
    () =>
      data.map((row) => ({
        ...row,
        total: sumRow(row, bins),
      })),
    [data, bins],
  );

  const {
    labelXScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  } = useWindRose({
    data: dataWithRowTotals,
    innerRadius,
    outerRadius,
    colorScheme,
    dataDirections,
    labelDirections,
    bins,
    padAngle,
    maxY,
  });

  const yTicks = yScale.ticks(tickCount);

  return (
    <svg
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      name="windrose"
      width={width}
      height={height}
      fontFamily="sans-serif"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            angleOffset={angleOffset}
            colorScale={colorScale}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        xScale={labelXScale}
        directions={labelDirections ?? dataDirections}
        outerRadius={outerRadius}
      />

      <RadialLines
        angleStep={angleStep}
        innerRadius={innerRadius}
        yScale={yScale}
        tickCount={tickCount}
      />

      <g
        name="ticks"
        textAnchor="middle"
        fontSize={fluidFontSize(0.12)(outerRadius)}
      >
        {yTicks.map((tick) => (
          <Tick key={tick} tick={tick} yScale={yScale} />
        ))}
      </g>

      {yUnits ? (
        <text
          name="units-label"
          y={-outerRadius}
          x={0.08 * outerRadius}
          fontSize={fluidFontSize(0.12)(outerRadius)}
          dominantBaseline="middle"
          paintOrder="stroke"
          strokeWidth={1}
          stroke="white"
          fill="black"
        >
          {yUnits}
        </text>
      ) : null}

      {children}
    </svg>
  );
}

export default WindRose;
