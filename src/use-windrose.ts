import { max } from "d3-array";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arc, type SeriesPoint, stack } from "d3-shape";
import { useMemo } from "react";
import type { WindroseDataPoint } from "./types.js";
import { radians, TURN } from "./util.js";

type UseWindRose<
  TBins extends ReadonlyArray<string> = Array<string>,
  TDirections extends ReadonlyArray<string> = Array<string>,
> = {
  directions: string[];
  bins: TBins;
  data: Array<WindroseDataPoint<TBins[number], TDirections[number]>>;
  innerRadius: number;
  outerRadius: number;
  colorScheme: ReadonlyArray<string>;
  padAngle: number;
  maxY?: number;
};

export function useWindRose<
  TBins extends ReadonlyArray<string> = Array<string>,
  TDirections extends ReadonlyArray<string> = Array<string>,
>({
  data,
  bins,
  innerRadius,
  outerRadius,
  directions,
  colorScheme,
  padAngle,
  maxY = max(data, (d) => d.total) ?? 0,
}: UseWindRose<TBins, TDirections>) {
  // An angular x-scale
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(directions)
        .range([0, radians(TURN)])
        .align(0),
    [directions],
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

  const angleStep = TURN / data.length;
  const angleOffset = -angleStep / 2;

  return {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  };
}
