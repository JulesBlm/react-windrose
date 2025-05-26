import { useMemo, type ReactNode, type SVGProps } from "react";
import { RadialLines, Tick } from "./ticks-radial-lines.js";
import { DirectionLabels } from "./labels.js";
import { Ring } from "./ring.js";
import type { WindroseDataPoint } from "./types.js";
import { useWindRose } from "./use-windrose.js";
import { blueColorScheme, sumRow } from "./util.js";

const directionAccessor = (d: { direction: string }) => d.direction;

export interface WindRoseProps<
  TBins extends ReadonlyArray<string> = Array<string>,
  TDirections extends ReadonlyArray<string> = Array<string>,
> extends SVGProps<SVGSVGElement> {
  width: number;
  height: number;
  data: Array<WindroseDataPoint<TBins[number], TDirections[number]>>;
  bins: TBins;
  yUnits: string;
  colorScheme: ReadonlyArray<string>;
  tickCount?: number;
  outerRadius?: number;
  innerRadius?: number;
  padAngle?: number;
  maxY?: number;
  children?: ReactNode;
}

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
  innerRadius = 20,
  outerRadius = Math.min(width, height) / 2.5,
  tickCount = 4,
  padAngle = 0.05,
  maxY,
  children,
  ...props
}: WindRoseProps<TBins, TDirections>) {

  const directions = data.map(directionAccessor);

  const dataWithRowTotals = useMemo(
    () => data.map((r) => ({ ...r, total: sumRow(r) })),
    [data],
  );

  const {
    xScale,
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
    directions,
    bins,
    padAngle,
    maxY,
  });

  const yTicks = yScale.ticks(tickCount);

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      name="windrose"
      width={width}
      fontFamily="sans-serif"
      {...props}
    >
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            name={element.key}
            angleOffset={angleOffset}
            fill={colorScale(element.key)}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        xScale={xScale}
        angleOffset={angleOffset}
        directions={directions}
        outerRadius={outerRadius}
      />

      <RadialLines
        angleStep={angleStep}
        innerRadius={innerRadius}
        yScale={yScale}
        tickCount={tickCount}
      />

      <g name="ticks" textAnchor="middle" fontSize={18}>
        {yTicks.map((tick) => (
          <Tick key={tick} tick={tick} yScale={yScale} />
        ))}
      </g>

      {yUnits ? (
        <text name="units-label" y={-outerRadius} x={15}>
          {yUnits}
        </text>
      ) : null}

      {children}
    </svg>
  );
}

export default WindRose;
