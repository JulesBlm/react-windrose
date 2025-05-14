import { sum } from "d3-array";

export function sumRow<DataType extends Record<string, number | string>>(
  row: DataType
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
