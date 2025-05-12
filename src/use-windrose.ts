import { max, sum } from "d3-array";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { arc, SeriesPoint, stack } from "d3-shape";
import { useMemo } from "react";
import { TURN, type WindroseDataPoint } from "./react-windrose";

type UseWindRose<
  TBins extends ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string>
> = {
  directions: TDirections;
  bins: TBins;
  data: Array<WindroseDataPoint<TBins>>;
  innerRadius: number;
  outerRadius: number;
  colorScheme: ReadonlyArray<string>;
  padAngle: number;
};

export function useWindRose<
  TBins extends ReadonlyArray<string>,
  TDirections extends ReadonlyArray<string>
>({
  data,
  bins,
  innerRadius,
  outerRadius,
  directions,
  colorScheme,
  padAngle,
}: UseWindRose<TBins, TDirections>) {
  // wait is it a good idea to do it here?
  const dataWithRowTotals: Array<WindroseDataPoint<TBins> & { total: number }> =
    useMemo(() => data.map((r) => ({ ...r, total: sumRow(r) })), [data]);

  type DataTypeWithTotals = (typeof dataWithRowTotals)[number];
  // const tickFormat = y.tickFormat(x => `${x}\%`);

  const yScale = useMemo(() => {
    const maxY = max(dataWithRowTotals, (d) => d.total);

    return scaleLinear().domain([0, maxY!]).range([innerRadius, outerRadius]);
  }, [innerRadius, outerRadius, dataWithRowTotals]);

  const colorScale = scaleOrdinal<TBins[number]>()
    .domain(bins)
    .range(colorScheme);

  // the x scale is for the position of the bars along the circle, one full turn
  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(directions)
        .range([0, radians(TURN)])
        .align(0),
    [directions]
  );

  const arcGenerator = useMemo(
    () =>
      arc<SeriesPoint<DataTypeWithTotals>>()
        .startAngle((d) => xScale(d.data.direction)!)
        .endAngle((d) => xScale(d.data.direction)! + xScale.bandwidth())
        .innerRadius((d) => yScale(d[0]))
        .outerRadius((d) => yScale(d[1]))
        .padRadius(innerRadius)
        .padAngle(padAngle),
    [innerRadius, padAngle, xScale, yScale]
  );

  const stackedData = useMemo(
    () =>
      stack<DataTypeWithTotals, TBins[number]>().keys(bins)(dataWithRowTotals),
    [dataWithRowTotals, bins]
  );

  return {
    xScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
  };
}

function sumRow<DataType extends Record<string, number | string>>(
  row: DataType
) {
  const rowValues = Object.entries(row)
    .filter(([k]) => k !== "direction")
    .map(([k, v]) => Number(v));
  const rowTowal = sum(rowValues);

  return rowTowal;
}

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
