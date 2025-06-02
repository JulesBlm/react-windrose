import { sumRow } from "../src/util.js";

export const defaultBins = ["0-1", "1-2", "2-3", "3-4", "4-5"] as const;

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

export const testData = makeTableData({
  bins: defaultBins,
  directions: cardinalDirections,
});

export const degreeDirections = [
  "0°",
  "22.5°",
  "45°",
  "67.5°",
  "90°",
  "112.5°",
  "135°",
  "157.5°",
  "180°",
  "202.5°",
  "225°",
  "247.5°",
  "270°",
  "292.5°",
  "315°",
  "337.5°",
] as const;

export const testDataDegrees = makeTableData({
  bins: defaultBins,
  directions: degreeDirections,
});

/** Generate new table data from given bins and directions */
export function makeTableData<
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string> = ReadonlyArray<string>,
>({ directions, bins }: { directions: TDirections; bins: TBins }) {
  if (!directions || !directions.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  if (!bins || !bins.length) {
    throw new Error("Directions array can't be empty or undefined");
  }

  const constructedData = directions.map((direction) => {
    type RowType = {
      direction: TDirections[number];
      total: number;
    } & Record<TBins[number], number>;

    const row: RowType = {
      direction,
    } as RowType;

    for (const bin of bins) {
      const rowValue = Math.floor(Math.random() * Math.floor(10));
      (row as any)[bin] = rowValue;
    }
    row.total = sumRow(row, bins);

    return row;
  });

  return constructedData;
}
