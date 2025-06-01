[**react-windrose v1.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [use-windrose](../README.md) / useWindRose

# Function: useWindRose()

> **useWindRose**\<`TBins`, `TDirections`\>(`props`): `object`

Defined in: [use-windrose.ts:55](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/use-windrose.ts#L55)

A React hook that generates the necessary scales and data transformations for a wind rose chart.
This hook handles the creation of angular scales for directions, radial scales for values,
color scales for bins, and arc generators for the segments.

## Type Parameters

### TBins

`TBins` *extends* readonly `string`[] = readonly `string`[]

Type of the bins array

### TDirections

`TDirections` *extends* readonly `string`[] = readonly `string`[]

Type of the directions array

## Parameters

### props

[`UseWindRose`](../type-aliases/UseWindRose.md)\<`TBins`, `TDirections`\>

Configuration object for the wind rose chart

## Returns

`object`

An object containing:
  - labelXScale: Scale for positioning direction labels
  - yScale: Radial scale for mapping values to radius
  - colorScale: Ordinal scale for mapping bins to colors
  - arcGenerator: Function for generating arc paths for segments
  - stackedData: Data transformed for stacked segments
  - angleStep: Angular step between segments
  - angleOffset: Angular offset for centering segments

### angleOffset

> **angleOffset**: `number`

### angleStep

> **angleStep**: `number`

### arcGenerator

> **arcGenerator**: `Arc`\<`any`, `SeriesPoint`\<\{ `direction`: `string`; \}\>\>

### colorScale

> **colorScale**: `ScaleOrdinal`\<`string`, `string`, `never`\>

### directions

> **directions**: `string`[]

### labelXScale

> **labelXScale**: `ScaleBand`\<`string`\>

### stackedData

> **stackedData**: `Series`\<`{ [K in string]: (BinsPoint<TBins[number]> & DefaultWindroseProps<TDirections[number]>)[K] }`, `TBins`\[`number`\]\>[]

### yScale

> **yScale**: `ScaleLinear`\<`number`, `number`, `never`\>
