import { max } from "d3-array";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arc, type SeriesPoint, stack } from "d3-shape";
import { useMemo } from "react";
import type { WindroseDataPoint } from "./types.js";
import { radians, TURN } from "./util.js";

/**
 * Props for the useWindRose hook
 * @template TBins - Type of the bins array
 * @template TDirections - Type of the directions array
 */
export type UseWindRose< 
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string> = ReadonlyArray<string>,
> = {
  /** Array of bin labels for the wind rose segments */
  bins: TBins;
  /** Array of data points for the wind rose chart */
  data: Array<WindroseDataPoint<TBins[number], TDirections[number]>>;
  /** Inner radius of the wind rose chart */
  innerRadius: number;
  /** Outer radius of the wind rose chart */
  outerRadius: number;
  /** Array of colors to use for the wind rose segments */
  colorScheme: ReadonlyArray<string>;
  /** Array of all unique directions present in the data */
  dataDirections: ReadonlyArray<string>;
  /** Optional array of direction labels to display. If not provided, all directions from dataDirections will be shown. 
   * This allows displaying fewer labels than there are directions in the data. */
  labelDirections?: Array<string>;
  /** Angle padding between segments in radians */
  padAngle: number;
  /** Optional maximum value for the y-axis scale. If not provided, will use the maximum value in the data */
  maxY?: number;
};

/**
 * A React hook that generates the necessary scales and data transformations for a wind rose chart.
 * This hook handles the creation of angular scales for directions, radial scales for values,
 * color scales for bins, and arc generators for the segments.
 * 
 * @template TBins - Type of the bins array
 * @template TDirections - Type of the directions array
 * @param props - Configuration object for the wind rose chart
 * @returns An object containing:
 *   - labelXScale: Scale for positioning direction labels
 *   - yScale: Radial scale for mapping values to radius
 *   - colorScale: Ordinal scale for mapping bins to colors
 *   - arcGenerator: Function for generating arc paths for segments
 *   - stackedData: Data transformed for stacked segments
 *   - angleStep: Angular step between segments
 *   - angleOffset: Angular offset for centering segments
 */
export function useWindRose<
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string> = ReadonlyArray<string>,
>({
  data,
  bins,
  innerRadius,
  outerRadius,
  colorScheme,
  dataDirections,
  labelDirections,
  padAngle,
  maxY = max(data, (d) => d.total) ?? 1,
}: UseWindRose<TBins, TDirections>) {
  // An angular x-scale
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(dataDirections)
        .range([0, radians(TURN)])
        .align(0),
    [dataDirections],
  );

  // We might have fewer labels than directions, so we a separate scale for the labels
  const labelXScale = useMemo(
    () =>
      scaleBand()
        .domain(labelDirections ?? dataDirections)
        .range([0, radians(TURN)])
        .align(0),
    [labelDirections, dataDirections],
  );

  // A radial y-scale maintains area proportionality of radial bars
  const yScale = useMemo(() => {
    return scaleLinear().domain([0, maxY]).range([innerRadius, outerRadius]);
  }, [innerRadius, outerRadius, maxY]);

  const colorScale = useMemo(
    () => scaleOrdinal<string>().domain(bins).range(colorScheme),
    [bins, colorScheme],
  );

  const arcGenerator = useMemo(
    () =>
      arc<SeriesPoint<{ direction: string }>>()
        .startAngle((d) => xScale(d.data.direction)!)
        .endAngle((d) => xScale(d.data.direction)! + xScale.bandwidth())
        .innerRadius((d) => yScale(d[0]))
        .outerRadius((d) => yScale(d[1]))
        .padRadius(innerRadius)
        .padAngle(padAngle),
    [innerRadius, padAngle, xScale, yScale],
  );

  const stackedData = useMemo(
    () =>
      stack<
        WindroseDataPoint<TBins[number], TDirections[number]>,
        TBins[number]
      >().keys(bins)(data),
    [data, bins],
  );

  const angleStep = TURN / (labelDirections ?? dataDirections).length;
  const angleOffset = -angleStep / 2;

  return {
    labelXScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  };
}
