[**react-windrose v1.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [legend](../README.md) / CircleLegendProps

# Interface: CircleLegendProps

Defined in: [legend.tsx:29](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L29)

## Extends

- [`BaseLegendProps`](BaseLegendProps.md)

## Properties

### bins

> **bins**: readonly `string`[]

Defined in: [legend.tsx:5](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L5)

Array of labels of the bins for each legend entry

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`bins`](BaseLegendProps.md#bins)

***

### children?

> `optional` **children**: `ReactNode`

Defined in: [legend.tsx:21](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L21)

Optional children to render inside the legend group, useful for adding a title or a background

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`children`](BaseLegendProps.md#children)

***

### colorScheme

> **colorScheme**: readonly `string`[]

Defined in: [legend.tsx:7](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L7)

Array of colors to use for each legend entry

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`colorScheme`](BaseLegendProps.md#colorscheme)

***

### spacing?

> `optional` **spacing**: `number`

Defined in: [legend.tsx:13](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L13)

Additional spacing between legend entries in pixels (added to symbolHeight)

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`spacing`](BaseLegendProps.md#spacing)

***

### symbol

> **symbol**: `"circle"`

Defined in: [legend.tsx:30](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L30)

***

### symbolHeight?

> `optional` **symbolHeight**: `number`

Defined in: [legend.tsx:11](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L11)

Height of the legend symbol in pixels

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`symbolHeight`](BaseLegendProps.md#symbolheight)

***

### symbolProps?

> `optional` **symbolProps**: `SVGProps`\<`SVGCircleElement`\>

Defined in: [legend.tsx:32](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L32)

Additional props to pass to the circle elements

***

### symbolWidth?

> `optional` **symbolWidth**: `number`

Defined in: [legend.tsx:9](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L9)

Width of the legend symbol in pixels

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`symbolWidth`](BaseLegendProps.md#symbolwidth)

***

### textProps?

> `optional` **textProps**: `SVGProps`\<`SVGTextElement`\>

Defined in: [legend.tsx:19](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L19)

Additional props to pass to the text elements

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`textProps`](BaseLegendProps.md#textprops)

***

### textX?

> `optional` **textX**: `number`

Defined in: [legend.tsx:15](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L15)

Horizontal offset for the text label in pixels

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`textX`](BaseLegendProps.md#textx)

***

### textY?

> `optional` **textY**: `number`

Defined in: [legend.tsx:17](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/legend.tsx#L17)

Vertical offset for the text label in pixels

#### Inherited from

[`BaseLegendProps`](BaseLegendProps.md).[`textY`](BaseLegendProps.md#texty)
