[**react-windrose v1.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [legend](../README.md) / BaseLegendProps

# Interface: BaseLegendProps

Defined in: [legend.tsx:3](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L3)

## Extends

- `SVGProps`\<`SVGGElement`\>

## Extended by

- [`RectLegendProps`](RectLegendProps.md)
- [`CircleLegendProps`](CircleLegendProps.md)

## Properties

### bins

> **bins**: readonly `string`[]

Defined in: [legend.tsx:5](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L5)

Array of labels of the bins for each legend entry

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [legend.tsx:21](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L21)

Optional children to render inside the legend group, useful for adding a title or a background

#### Overrides

`SVGProps.children`

***

### colorScheme

> **colorScheme**: readonly `string`[]

Defined in: [legend.tsx:7](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L7)

Array of colors to use for each legend entry

***

### spacing?

> `optional` **spacing**: `number`

Defined in: [legend.tsx:13](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L13)

Additional spacing between legend entries in pixels (added to symbolHeight)

#### Overrides

`SVGProps.spacing`

***

### symbolHeight?

> `optional` **symbolHeight**: `number`

Defined in: [legend.tsx:11](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L11)

Height of the legend symbol in pixels

***

### symbolWidth?

> `optional` **symbolWidth**: `number`

Defined in: [legend.tsx:9](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L9)

Width of the legend symbol in pixels

***

### textProps?

> `optional` **textProps**: `SVGProps`\<`SVGTextElement`\>

Defined in: [legend.tsx:19](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L19)

Additional props to pass to the text elements

***

### textX?

> `optional` **textX**: `number`

Defined in: [legend.tsx:15](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L15)

Horizontal offset for the text label in pixels

***

### textY?

> `optional` **textY**: `number`

Defined in: [legend.tsx:17](https://github.com/JulesBlm/react-windrose/blob/4c90b4c4e20ea2808adde010911e8780345b3f2c/src/legend.tsx#L17)

Vertical offset for the text label in pixels
