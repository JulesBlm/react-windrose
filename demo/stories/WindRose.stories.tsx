import type { Meta, StoryObj } from "@storybook/react";
import { WindRose, HorizontalLegend, VerticalLegend } from "../../src/index.js";
import { defaultBins, testData, testDataDegrees } from "../util.js";

const blues = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];
const greens = ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"];
const greys = ["#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"];
const purples = ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"];
const reds = ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"];

const meta: Meta<typeof WindRose> = {
  title: "WindRose",
  component: WindRose,
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
    yUnits: {
      control: { type: "text" },
      description: "Units for the radial scale",
    },
    tickCount: {
      control: { type: "number", step: 5 },
      description: "Number of tick marks on the radial scale",
    },
    innerRadius: {
      control: { type: "number" },
      description: "Inner radius of the wind rose",
    },
    outerRadius: {
      control: { type: "number" },
      description: "Outer radius of the wind rose",
    },
    padAngle: {
      control: { type: "number", min: 0, max: 1, step: 0.01 },
      description: "Padding angle between segments",
    },
    colorScheme: {
      control: { type: "select" },
      options: [greens, greys, purples, reds],
      description: "Color scheme for the wind rose segments",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const Large: Story = {
  args: {
    width: 1000,
    height: 1000,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const Small: Story = {
  args: {
    width: 250,
    height: 250,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const ExtraSmall: Story = {
  args: {
    width: 125,
    height: 125,
    innerRadius: 2,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const CardinalDirections: Story = {
  args: {
    width: 500,
    height: 500,
    labelDirections: ["N", "E", "S", "W"],
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const PadAngle: Story = {
  args: {
    width: 500,
    height: 500,
    padAngle: 0.5,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
  },
};

export const WithLegend: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    colorScheme: blues,
    bins: defaultBins,
    yUnits: "Hours",
    children: (
      <VerticalLegend
        bins={defaultBins}
        colorScheme={blues}
        transform="translate(180, -180)"
      >
        <text x={0} dy="-0.5em" fontSize={14}>
          Wind speed
        </text>
      </VerticalLegend>
    ),
  },
};

export const WithLegendHorizontal: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    colorScheme: blues,
    bins: defaultBins,
    yUnits: "Hours",
    outerRadius: 120,
    children: (
      <HorizontalLegend
        bins={defaultBins}
        colorScheme={blues}
        spacing={0}
        transform="translate(-50, 165)"
        orientation="horizontal"
      />
    ),
  },
};

export const CustomizedLegend: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    bins: defaultBins,
    colorScheme: blues,
    yUnits: "Hours",
    children: (
      <VerticalLegend
        bins={defaultBins}
        colorScheme={blues}
        transform="translate(180, -180)"
        spacing={0}
        textX={14}
        textY={10}
        textProps={{
          textAnchor: "middle",
          dominantBaseline: "middle",
          dy: "0.1em",
          style: {
            fill: "white",
            mixBlendMode: "difference",
          },
        }}
        symbolWidth={28}
        symbolHeight={20}
      />
    ),
  },
};

export const WithCircleLegend: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    bins: defaultBins,
    colorScheme: greens,
    yUnits: "Hours",
    children: (
      <VerticalLegend
        bins={defaultBins}
        colorScheme={greens}
        symbol="circle"
        transform="translate(190, -230)"
        spacing={2}
        symbolProps={{
          stroke: "grey",
        }}
      >
        <text x={0} dy="-0.5em" fontSize={14}>
          Legend
        </text>
      </VerticalLegend>
    ),
  },
};

export const LargeInnerRadius: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
    innerRadius: 60,
  },
};

export const NoInnerRadius: Story = {
  args: {
    width: 500,
    height: 500,
    data: testData,
    bins: defaultBins,
    yUnits: "Hours",
    innerRadius: 0,
  },
};

export const DegreeDirections: Story = {
  args: {
    width: 500,
    height: 500,
    data: testDataDegrees,
    bins: defaultBins,
    yUnits: "Hours",
    labelDirections: [
      "0°",
      "45°",
      "90°",
      "135°",
      "180°",
      "225°",
      "270°",
      "315°",
    ],
  },
};
