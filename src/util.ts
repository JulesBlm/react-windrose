import { sum } from "d3-array";

export function sumRow<DataType extends Record<string, unknown>>(
  row: DataType,
) {
  const rowValues = Object.entries(row)
    .filter(([k]) => k !== "direction")
    .map(([_k, v]) => Number(v));
  const rowTowal = sum(rowValues);

  return rowTowal;
}

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export const TURN = 360;

// d3.schemeBlues[9]
export const blueColorScheme = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
  "#4292c6",
  "#2171b5",
  "#08519c",
  "#08306b",
];
