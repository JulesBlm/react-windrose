/* TODO
 * 3. Get rid of Magic Numbers!
 * 4. Documentation
 * 5. Examples
 * 6. Tests
 */
import { max } from "d3-array";
import { useMemo, type ReactNode } from "react";
import { Axes, Tick } from "./axes";
import { DirectionLabels } from "./labels";
import { Ring } from "./ring";
import type { WindroseDataPoint } from "./types";
import { useWindRose } from "./use-windrose";
import { defaultColorScheme, sumRow } from "./util";

const directionAccessor = (d: { direction: string }) => d.direction;

export interface WindRoseProps<
  TBins extends ReadonlyArray<string> = Array<string>,
  TDirections extends ReadonlyArray<string> = Array<string>
> {
  width: number;
  height: number;
  data: Array<WindroseDataPoint<TBins[number], TDirections[number]>>;
  bins: TBins;
  yUnits: string;
  colorScheme: ReadonlyArray<string>;
  nrOfYTicks?: number;
  innerRadius?: number;
  padAngle?: number;
  children?: ReactNode;
}

export function WindRose<
  TBins extends ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string>
>({
  width,
  height,
  data,
  bins,
  yUnits,
  colorScheme = defaultColorScheme,
  innerRadius = 20,
  nrOfYTicks = 5,
  padAngle = 0.05,
  children,
}: WindRoseProps<TBins, TDirections>) {
  const outerRadius = Math.min(width, height) / 2.5;

  const directions = data.map(directionAccessor);

  const dataWithRowTotals = useMemo(
    () => data.map((r) => ({ ...r, total: sumRow(r) })),
    [data]
  );

  const maxY = max(dataWithRowTotals, (d) => d.total) ?? 0;

  const {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    yLineStep,
    angleOffset,
  } = useWindRose({
    maxY,
    data: dataWithRowTotals,
    innerRadius,
    outerRadius,
    colorScheme,
    directions,
    bins,
    padAngle,
  });

  const yTicks = yScale.ticks(nrOfYTicks);

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      name="windrose"
      height={600}
      fontFamily="sans-serif"
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

      <Axes
        yLineStep={yLineStep}
        innerRadius={innerRadius}
        yScale={yScale}
        yTicks={yTicks}
      />

      <g name="ticks" textAnchor="middle" fontSize={18}>
        {yTicks.map((tick) => (
          <Tick key={tick} tick={tick} yScale={yScale} />
        ))}
      </g>

      <text name="units-label" y={-outerRadius} x={15}>
        {yUnits}
      </text>

      {children}
    </svg>
  );
}

export default WindRose;
