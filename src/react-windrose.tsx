/*
 * 
 * Infer bin titles and trickle them down
 * Get rid of Magic Numbers!
 *
 * Make Windrose slotted so user can compose their own?
 */
import React from "react";
import { Axes, Ring, YTicks } from "./axes";
import { DirectionLabels } from "./labels";
import { useWindRose } from "./use-windrose";

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

export const TURN = 360;

export const defaultColorScheme = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
]; // d3.schemeBlues[9]

interface Row {
  direction: string;
}

export interface WindRoseProps<
  TBins extends ReadonlyArray<string> = Array<string>
> {
  width: number;
  height: number;
  data: Array<WindroseDataPoint<TBins>>;
  bins: TBins;
  yUnits: string;
  colorScheme: Array<string>;
  nrOfYTicks?: number;
  innerRadius?: number;
  padAngle?: number;
  directionAccessor?: (d: any) => string;
  children?: React.ReactNode;
}

export function WindRose<
  Bins extends ReadonlyArray<string>,
  Directions extends ReadonlyArray<string>
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
  directionAccessor = (d: Row) => d.direction,
  children,
}: WindRoseProps) {
  const outerRadius = Math.min(width, height) / 2.5;

  const directions = data.map((d) => directionAccessor(d));

  const { xScale, yScale, colorScale, arcGenerator, stackedData } = useWindRose<
    typeof bins,
    typeof directions
  >({
    data,
    innerRadius,
    outerRadius,
    colorScheme,
    directions,
    bins,
    padAngle,
  });
  const tickFormat = yScale.tickFormat(".2%");

  const yTicks = yScale.ticks(nrOfYTicks);

  const yLineStep = TURN / data.length;
  const angleOffset = -yLineStep / 2; // to shift each bar to middle of line

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      name="windrose"
      height={600}
      style={{ border: "1px solid red" }}
      fontFamily="sans-serif"
    >
      <Axes
        yLineStep={yLineStep}
        innerRadius={innerRadius}
        yScale={yScale}
        yTicks={yTicks}
      />

      <g name="rings">
        {stackedData.map((d, i) => (
          <Ring
            key={d.key}
            d={d}
            name={bins[i]}
            angleOffset={angleOffset}
            fill={colorScale(d.key)}
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

      <YTicks
        yScale={yScale}
        outerRadius={outerRadius}
        yTicks={yTicks}
        yUnits={yUnits}
      />

      {children}
    </svg>
  );
}

export const defaultBins = ["0-1", "1-2", "2-3", "3-4", "4-5"] as const;

export const testData = makeTableData({
  bins: defaultBins,
  directions: cardinalDirections,
});

/** Generate new table data from given bins and directions */
export function makeTableData<
  Bins extends ReadonlyArray<string> = ReadonlyArray<string>,
  Directions extends ReadonlyArray<string> = ReadonlyArray<string>
>({ directions, bins }: { directions: Directions; bins: Bins }) {
  if (!directions || !directions.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  if (!bins || !bins.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  const constructedData = directions.map((direction) => {
    const row = { direction };

    for (const bin of bins) {
      const rowValue = Math.floor(Math.random() * Math.floor(5));

      row[bin] = rowValue;
    }

    return row;
  });

  return constructedData;
}

export default WindRose;

// type WindroseDataPointProps<TAngle = CardinalDirection> = {
//   angle: TAngle;
//   total: number;
// };

const testBins = [
  "0-1",
  "1-2",
  "2-3",
  "3-4",
  "4-5",
  "5-6",
  "6-7",
  "7+",
] as const;

type TestBins = typeof testBins;

type Bin = TestBins[number];

type RowData<Bins extends ReadonlyArray<string> | Array<string> = TestBins> = {
  [Bin in Bins[number]]: number;
};

type RowA = AddDirection<RowData<TestBins>>;

type AddDirection<
  TData extends Record<string, number>,
  TDirectionKey extends string = "direction",
  TDirection extends string = string
> = {
  [K in TDirectionKey]: TDirection;
} & TData;

export type WindroseDataPoint<
  TBins extends ReadonlyArray<string> = TestBins,
  TDirection extends string = "direction"
> = Prettify<AddDirection<RowData<TBins>, TDirection>>;

// export type MakeWindRoseDataType<
//   Bins extends ReadonlyArray<string>,
//   DirectionType extends ReadonlyArray<string>
// > = {
//   direction: DirectionType[number];
// } & {
//   [Bin in Bins[number]]: number | undefined;
// };

// type WindroseDataPointA = Prettify<WindroseDataPoint<TestBins>>

// type WindroseDataPointB = WindroseDataPoint<["0-1", "1-2", "2-3", "3-4", "4-5"]>

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
