[**react-windrose v2.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [use-windrose](../README.md) / UseWindRose

# Type Alias: UseWindRose\<TBins, TDirections\>

> **UseWindRose**\<`TBins`, `TDirections`\> = `object`

Defined in: [use-windrose.ts:14](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L14)

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

Defined in: [use-windrose.ts:19](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L19)

Array of bin labels for the wind rose segments

***

### colorScheme

> **colorScheme**: `ReadonlyArray`\<`string`\>

Defined in: [use-windrose.ts:27](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L27)

Array of colors to use for the wind rose segments

***

### data

> **data**: `ReadonlyArray`\<`WindroseDataPoint`\<`TBins`\[`number`\], `TDirections`\[`number`\]\>\>

Defined in: [use-windrose.ts:21](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L21)

Array of data points for the wind rose chart

***

### innerRadius

> **innerRadius**: `number`

Defined in: [use-windrose.ts:23](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L23)

Inner radius of the wind rose chart

***

### labelDirections?

> `optional` **labelDirections**: `string`[]

Defined in: [use-windrose.ts:30](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L30)

Optional array of direction labels to display. If not provided, all directions from data will be shown.
This allows displaying fewer labels than there are directions in the data.

***

### maxY?

> `optional` **maxY**: `number`

Defined in: [use-windrose.ts:34](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L34)

Optional maximum value for the y-axis scale. If not provided, will use the maximum value in the data

***

### outerRadius

> **outerRadius**: `number`

Defined in: [use-windrose.ts:25](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L25)

Outer radius of the wind rose chart

***

### padAngle?

> `optional` **padAngle**: `number`

Defined in: [use-windrose.ts:32](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/use-windrose.ts#L32)

Angle padding between segments in radians
