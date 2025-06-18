import { max } from "d3-array";
import type { WindroseDataPoint } from "./types.js";

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export const fluidFontSize = (scale: number) => (outerRadius: number) =>
  Math.max(8, Math.min(18, outerRadius * scale));

/** One full turn in degrees */
export const TURN = 360;

// d3.schemeBlues[9] - using darker colors for better visibility
export const blueColorScheme = [
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
  "#0056b3",
  "#003d82",
];

export function sumRow<TBins extends ReadonlyArray<string>>(
  row: Record<TBins[number], unknown> & Record<string, unknown>,
  bins: TBins,
): number {
  let sum = 0;
  for (const bin of bins) {
    const value = row[bin as TBins[number]];
    if (typeof value === "number") {
      sum += value;
    } else if (typeof value === "string") {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        sum += numValue;
      }
    }
  }
  return sum;
}

export function getMaxY<
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string> = ReadonlyArray<string>,
>(
  data: ReadonlyArray<WindroseDataPoint<TBins[number], TDirections[number]>>,
  bins: TBins,
) {
  const dataWithTotals = data.map((row) => ({
    ...row,
    total: sumRow(row, bins),
  }));

  return max(dataWithTotals, (d) => d.total);
}