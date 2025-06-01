[**react-windrose v1.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [ring](../README.md) / RingProps

# Interface: RingProps

Defined in: [ring.tsx:8](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/ring.tsx#L8)

Props for the Ring component that renders a single ring of a windrose chart

## Extends

- `SVGProps`\<`SVGGElement`\>

## Properties

### angleOffset

> **angleOffset**: `number`

Defined in: [ring.tsx:12](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/ring.tsx#L12)

The angular offset of the ring

***

### arcGenerator

> **arcGenerator**: `Arc`\<`unknown`, `SeriesPoint`\<\{ `direction`: `string`; \}\>\>

Defined in: [ring.tsx:16](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/ring.tsx#L16)

The generator function for the ring

***

### colorScale

> **colorScale**: `ScaleOrdinal`\<`string`, `string`\>

Defined in: [ring.tsx:14](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/ring.tsx#L14)

The color scale for the ring

***

### element

> **element**: `Series`\<\{ `direction`: `string`; \}, `string`\>

Defined in: [ring.tsx:10](https://github.com/JulesBlm/react-windrose/blob/abde2242853bd42ef8c57edc6c92a0c1b545713c/src/ring.tsx#L10)

The data series for the ring
