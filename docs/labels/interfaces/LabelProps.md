[**react-windrose v2.0.0**](../../README.md)

***

[react-windrose](../../README.md) / [labels](../README.md) / LabelProps

# Interface: LabelProps

Defined in: [labels.tsx:61](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L61)

Props for the Label component that renders a single direction label

## Properties

### angleOffset

> **angleOffset**: `number`

Defined in: [labels.tsx:65](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L65)

Angular offset to adjust label positioning

***

### direction

> **direction**: `string`

Defined in: [labels.tsx:63](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L63)

The direction text to display

***

### directionScale

> **directionScale**: `ScaleBand`\<`string`\>

Defined in: [labels.tsx:67](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L67)

D3 scale for mapping directions to angles

***

### offset?

> `optional` **offset**: `number`

Defined in: [labels.tsx:71](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L71)

Optional offset from the outer radius (defaults to 10% of outerRadius)

***

### outerRadius

> **outerRadius**: `number`

Defined in: [labels.tsx:69](https://github.com/JulesBlm/react-windrose/blob/2451c9dad633102e7fc35b9698082791f2a32227/src/labels.tsx#L69)

The radius of the outer circle where the label will be positioned
