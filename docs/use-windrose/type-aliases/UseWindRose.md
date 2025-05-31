[**react-windrose v1.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [use-windrose](../README.md) / UseWindRose

# Type Alias: UseWindRose\<TBins, TDirections\>

> **UseWindRose**\<`TBins`, `TDirections`\> = `object`

Defined in: [use-windrose.ts:13](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L13)

Props for the useWindRose hook

## Type Parameters

### TBins

`TBins` *extends* `ReadonlyArray`\<`string`\> = `ReadonlyArray`\<`string`\>

Type of the bins array

### TDirections

`TDirections` *extends* `ReadonlyArray`\<`string`\> = `ReadonlyArray`\<`string`\>

Type of the directions array

## Properties

### bins

> **bins**: `TBins`

Defined in: [use-windrose.ts:18](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L18)

Array of bin labels for the wind rose segments

***

### colorScheme

> **colorScheme**: `ReadonlyArray`\<`string`\>

Defined in: [use-windrose.ts:26](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L26)

Array of colors to use for the wind rose segments

***

### data

> **data**: `WindroseDataPoint`\<`TBins`\[`number`\], `TDirections`\[`number`\]\>[]

Defined in: [use-windrose.ts:20](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L20)

Array of data points for the wind rose chart

***

### dataDirections

> **dataDirections**: `ReadonlyArray`\<`string`\>

Defined in: [use-windrose.ts:28](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L28)

Array of all unique directions present in the data

***

### innerRadius

> **innerRadius**: `number`

Defined in: [use-windrose.ts:22](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L22)

Inner radius of the wind rose chart

***

### labelDirections?

> `optional` **labelDirections**: `string`[]

Defined in: [use-windrose.ts:31](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L31)

Optional array of direction labels to display. If not provided, all directions from dataDirections will be shown. 
This allows displaying fewer labels than there are directions in the data.

***

### maxY?

> `optional` **maxY**: `number`

Defined in: [use-windrose.ts:35](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L35)

Optional maximum value for the y-axis scale. If not provided, will use the maximum value in the data

***

### outerRadius

> **outerRadius**: `number`

Defined in: [use-windrose.ts:24](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L24)

Outer radius of the wind rose chart

***

### padAngle

> **padAngle**: `number`

Defined in: [use-windrose.ts:33](https://github.com/JulesBlm/react-windrose/blob/f66bc41b0df955f97c6bbd9516aa1d43263eb14c/src/use-windrose.ts#L33)

Angle padding between segments in radians
