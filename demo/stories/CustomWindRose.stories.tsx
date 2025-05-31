import { useMemo } from "react";
import {
  blueColorScheme,
  DirectionLabels,
  RadialLines,
  Ring,
  sumRow,
  Tick,
  useWindRose,
  type WindroseDataPoint,
} from "../../src/index.js";
import { defaultBins } from "../util.js";
import { testData } from "../util.js";
import type { Meta, StoryObj } from "@storybook/react";
import { TickCircle } from "../../src/radial-lines.js";

interface CustomWindRoseProps<
  TBins extends ReadonlyArray<string> = ReadonlyArray<string>,
> {
  data: Array<WindroseDataPoint<TBins[number], string>>;
  bins: TBins;
  width: number;
  height: number;
  colorScheme: Array<string>;
}

function CustomWindRose({
  data,
  bins,
  width,
  height,
  colorScheme,
}: CustomWindRoseProps<typeof defaultBins>) {
  const outerRadius = Math.min(width, height) / 2.5;
  const innerRadius = 20;
  const dataDirections = useMemo(() => data.map((d) => d.direction), [data]);

  // Calculate row totals
  const dataWithRowTotals = useMemo(
    () => data.map((r) => ({ ...r, total: sumRow(r, bins) })),
    [data],
  );

  const {
    labelXScale,
    yScale,
    colorScale,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  } = useWindRose<typeof defaultBins, typeof dataDirections>({
    data: dataWithRowTotals,
    innerRadius,
    outerRadius,
    colorScheme,
    dataDirections,
    bins,
    padAngle: 0.05,
  });

  const yTicks = yScale.ticks(4);

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      width={width}
      height={height}
      fontFamily="sans-serif"
    >
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            angleOffset={angleOffset}
            colorScale={colorScale}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        xScale={labelXScale}
        directions={dataDirections}
        outerRadius={outerRadius}
        fontSize={14}
        fontWeight={500}
      />

      <RadialLines
        angleStep={angleStep}
        innerRadius={innerRadius}
        yScale={yScale}
        tickCount={4}
        stroke="#888"
      />

      <g name="ticks" textAnchor="middle" fontSize={14}>
        {yTicks.map((tick) => (
          <Tick
            key={tick}
            tick={tick}
            yScale={yScale}
            circleProps={{ stroke: "#888" }}
            textProps={{ fill: "#333" }}
          />
        ))}
      </g>
    </svg>
  );
}

const meta: Meta<typeof CustomWindRose> = {
  title: "CustomWindRose",
  component: CustomWindRose,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number", step: 50 },
      description: "Width of the wind rose diagram",
    },
    height: {
      control: { type: "number", step: 50 },
      description: "Height of the wind rose diagram",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 400,
    height: 400,
    data: testData,
    bins: defaultBins,
    colorScheme: blueColorScheme,
  },
};

const labelDirections = ["N", "E", "S", "W"];

export const CustomCircles: Story = {
  args: {
    width: 400,
    height: 400,
    data: testData,
    bins: [...defaultBins],
    colorScheme: blueColorScheme,
  },
  render: (args) => {
    const outerRadius = Math.min(args.width, args.height) / 2.5;
    const innerRadius = 20;
    const dataDirections = useMemo(
      () => args.data.map((d) => d.direction),
      [args.data],
    );

    const dataWithRowTotals = useMemo(
      () => args.data.map((r) => ({ ...r, total: sumRow(r, args.bins) })),
      [args.data, args.bins],
    );

    const {
      labelXScale,
      yScale,
      colorScale,
      arcGenerator,
      stackedData,
      angleStep,
      angleOffset,
    } = useWindRose({
      data: dataWithRowTotals,
      dataDirections,
      labelDirections,
      innerRadius,
      outerRadius,
      colorScheme: args.colorScheme,
      bins: args.bins,
      padAngle: 0.05,
    });

    const yTicks = yScale.ticks(4);

    return (
      <svg
        viewBox={`${-args.width / 2}, ${-args.height / 2}, ${args.width}, ${args.height}`}
        width={args.width}
        height={args.height}
      >
        <g name="rings">
          {stackedData.map((element) => (
            <Ring
              key={element.key}
              element={element}
              angleOffset={angleOffset}
              colorScale={colorScale}
              arcGenerator={arcGenerator}
            />
          ))}
        </g>

        <DirectionLabels
          xScale={labelXScale}
          directions={labelDirections}
          outerRadius={outerRadius}
          fontSize={14}
          fontWeight={500}
        />

        <RadialLines
          angleStep={angleStep}
          innerRadius={innerRadius}
          yScale={yScale}
          tickCount={4}
          stroke="#888"
          strokeDasharray="none"
        />

        <g name="ticks" textAnchor="middle" fontSize={14}>
          {yTicks.map((tick, index) => (
            <Tick
              key={tick}
              tick={tick}
              yScale={yScale}
              circleProps={{
                stroke: "#666",
                strokeWidth: index === yTicks.length - 1 ? 2 : 1,
                strokeDasharray: "none",
              }}
            />
          ))}
        </g>
      </svg>
    );
  },
};

export const CustomYAxis: Story = {
  args: {
    width: 400,
    height: 400,
    data: testData,
    bins: [...defaultBins],
    colorScheme: blueColorScheme,
  },
  render: (args) => {
    const outerRadius = Math.min(args.width, args.height) / 2.5;
    const innerRadius = 10;
    const dataDirections = useMemo(
      () => args.data.map((d) => d.direction),
      [args.data],
    );

    const dataWithRowTotals = useMemo(
      () => args.data.map((r) => ({ ...r, total: sumRow(r, args.bins) })),
      [args.data, args.bins],
    );

    const {
      labelXScale,
      yScale,
      colorScale,
      arcGenerator,
      stackedData,
      angleStep,
      angleOffset,
    } = useWindRose({
      data: dataWithRowTotals,
      dataDirections,
      labelDirections,
      innerRadius,
      outerRadius,
      colorScheme: args.colorScheme,
      bins: args.bins,
      padAngle: 0.05,
    });

    const yTicks = yScale.ticks(4);
    const tickFormat = yScale.tickFormat();

    return (
      <svg
        viewBox={`${-args.width / 2}, ${-args.height / 2}, ${args.width}, ${args.height}`}
        width={args.width}
        height={args.height}
        fontFamily="sans-serif"
      >
        <g name="rings">
          {stackedData.map((element) => (
            <Ring
              key={element.key}
              element={element}
              angleOffset={angleOffset}
              colorScale={colorScale}
              arcGenerator={arcGenerator}
            />
          ))}
        </g>

        <DirectionLabels
          xScale={labelXScale}
          directions={labelDirections}
          outerRadius={outerRadius}
          fontSize={14}
          fontWeight={500}
        />

        <RadialLines
          angleStep={angleStep}
          innerRadius={innerRadius}
          yScale={yScale}
          tickCount={4}
          stroke="#888"
          strokeDasharray="none"
        />

        <g name="ticks" textAnchor="middle" fontSize={14}>
          {yTicks.map((tick) => (
            <g name="tick" key={tick}>
              <TickCircle tick={tick} yScale={yScale} />

              <text
                x={yScale(tick) * Math.SQRT1_2}
                y={-yScale(tick) * Math.SQRT1_2}
                dy="0.35em"
                paintOrder="stroke"
                strokeWidth="2"
                stroke="white"
              >
                {tickFormat(tick)}
              </text>
            </g>
          ))}
        </g>
      </svg>
    );
  },
};
