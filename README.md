# React Windrose

[![npm version](https://badge.fury.io/js/react-windrose.svg)](https://www.npmjs.com/package/react-windrose)

`react-windrose` is a React component library for creating wind rose diagrams. Wind rose charts display the distribution of wind speed and direction, commonly used in meteorology and environmental analysis.

`react-windrose` is built on top of D3.js for calculations and scales and uses React for rendering SVG elements. It provides a flexible way to create interactive wind rose diagrams.

![windrose chart made with react-windrose](./windrose.png)

See [the Storybook](https://julesblom.com/react-windrose?path=/docs/windrose--docs) for examples.

## Installation

```bash
npm install react-windrose
```

## Usage

The `<WindRose>` component provides a wind rose chart with sensible defaults and a clean design. Here's the minimal code needed to create a wind rose:

```tsx
import { WindRose } from "react-windrose";

// Your data: array of objects with direction and bin values
const data = [
  { direction: "North", low: 2, medium: 3, high: 1 },
  { direction: "East", low: 6, medium: 1, high: 0 },
  { direction: "South", low: 5, medium: 1, high: 3 },
  { direction: "West", low: 1, medium: 1, high: 2 },
];

// The bin keys that match your data
const bins = ["low", "medium", "high"] as const;

function MyWindRose() {
  return <WindRose data={data} bins={bins} />;
}
```

### Optional Props

You can customize the appearance and behavior with these optional props:

```tsx
const colorScheme = [
  "#f7fbff",
  "#deebf7",
  "#c6dbef",
  "#9ecae1",
  "#6baed6",
] as const;
const labelDirections = ["N", "E", "S", "W"] as const;

<WindRose
  data={data}
  bins={bins}
  // Size of the chart (defaults to 400x400)
  width={600}
  height={600}
  // Units to show on the value markers
  yUnits="m/s"
  // Clor scheme for the rings of segments
  colorScheme={colorScheme}
  // Number of value markers (default: 4)
  tickCount={5}
  // Inner and outer radius
  innerRadius={20} // deafult 20
  outerRadius={200} // default calculated from width/height
  // Custom direction labels, in case you want to show fewer direction labels than in the data
  labelDirections={labelDirections}
  // Space between segments in radians (default: 0.05)
  padAngle={0.1}
  // Maximum value for the scale (defaults to max in data)
  maxY={20}
/>;
```

**Note:** The `total` per row in the data is automatically calculated by the component using the `sumRow` utility function and need not be provided in your input data to `<WindRose>`.

### With Legend

Add a legend to your wind rose to show what the colors mean.
`react-windrose` provides two legend components `VerticalLegend`, and `HorizontalLegend`.

Position the legend by setting its `transform` property. You can add a title by passing it as a child element.

```tsx
import { WindRose, VerticalLegend } from "react-windrose";

function WindRoseWithLegend() {
  return (
    <WindRose data={data} bins={bins} colorScheme={colorScheme}>
      <VerticalLegend
        bins={bins}
        colorScheme={colorScheme}
        // Position the legend to the right of the wind rose
        transform="translate(180, -180)"
      >
        <text
          textDecoration="underline"
          textAnchor="middle"
          transform="translate(0, -20)"
        >
          Wind Speed (m/s)
        </text>
      </VerticalLegend>
    </WindRose>
  );
}
```

See the [legend docs](./docs/legend/README.md) for all the configuration options of the legend components.

## Building Custom Wind Roses

You can create custom wind rose diagrams by using the `useWindRose` hook and composing the individual components. This gives you complete control over the appearance of your wind rose.

### `useWindRose`

The `useWindRose` hook provides all the necessary scales and generators for creating wind rose diagrams:

```typescript
const {
  directionScale,       // D3 scale for the angular direction
  yScale,       // D3 scale for the radial values
  colorScale,   // D3 scale for the colors
  directions    // Direction labels to display
  arcGenerator, // D3 arc generator
  stackedData,  // Stacked data for rendering
  angleStep,    // Step size for radial lines (360 / data.length)
  angleOffset,  // Angle offset for proper orientation (-angleStep / 2)
} = useWindRose({
  data,         // Your data with row totals (Array<WindroseDataPoint>)
  bins,         // Array of bin names (Array<string>
  innerRadius,  // Inner radius of the wind rose (number)
  outerRadius,  // Outer radius of the wind rose (number)
  directions,   // Array of direction values (Array<string>)
  colorScheme,  // Color scheme for the bins (Array<string>)
  labelDirections // Optional array of direction labels to display. If not provided, all directions from data will be shown.
  padAngle,     // Padding angle between segments (number)
  maxY,         // Optional maximum y value for scale (number, defaults to max total in data)
});
```

### Components

- `Ring`: Renders a single segment ring for a specific bin
- `RadialLines`: Renders the spokes of the wind rose
- `DirectionLabels`: Renders the direction `Label`s around the wind rose
  - `Label`: Renders a single direction label positioned around a the wind rose
- `Ticks`: Renders a group of `Tick` marks with their labels
  - `Tick`: Renders a tick mark on the y-scale, consisting of a dashed circle (`TickCircle`) and its value label (`TickLabel`)
    - `TickCircle`: Renders the dashed circle at a specific radius
    - `TickLabel`: Renders the value label at the same radius as its circle

### Example: Custom Wind Rose

```jsx
import { useMemo } from "react";
import {
  Ring,
  RadialLines,
  DirectionLabels,
  Tick,
  useWindRose,
  sumRow,
} from "react-windrose";

function CustomWindRose({ data, bins, width, height, colorScheme }) {
  const outerRadius = Math.min(width, height) / 2.5;
  const innerRadius = 20;

  // Calculate row totals
  const dataWithRowTotals = useMemo(
    () => data.map((r) => ({ ...r, total: sumRow(r) })),
    [data],
  );

  // Use the hook to get scales and generators
  const {
    directionScale,
    yScale,
    colorScale,
    directions,
    arcGenerator,
    stackedData,
    angleStep,
    angleOffset,
  } = useWindRose({
    data: dataWithRowTotals,
    innerRadius,
    outerRadius,
    colorScheme,
    bins,
    padAngle: 0.05,
  });

  const yTicks = yScale.ticks(4);

  return (
    <svg
      viewBox={`${-width / 2}, ${-height / 2}, ${width}, ${height}`}
      width={width}
      height={height}
    >
      <g name="rings">
        {stackedData.map((element) => (
          <Ring
            key={element.key}
            element={element}
            angleOffset={angleOffset}
            fill={colorScale(element.key)}
            arcGenerator={arcGenerator}
          />
        ))}
      </g>

      <DirectionLabels
        directionScale={directionScale}
        angleOffset={angleOffset}
        directions={directions}
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

      <text y={-outerRadius - 10} textAnchor="middle" fontWeight="bold">
        Custom Wind Rose
      </text>
    </svg>
  );
}
```

This approach allows you to create highly customized wind rose visualizations while still leveraging the core functionality of the library.

See [the Storybook](https://julesblom.com/react-windrose?path=/docs/customwindrose--docs) for more examples of custom windrose charts.

## API Reference

For detailed API documentation, see the [docs](./docs/README.md).

## License

MIT © [Jules Blom](https://julesblom.com)

[Bedrock](https://bedrock.engineer)
