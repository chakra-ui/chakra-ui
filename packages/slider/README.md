# @chakra-ui/slider

The Slider is used to allow users to make selections from a range of values.

Sliders reflect a range of values along a bar, from which users may select a
single value. They are ideal for adjusting settings such as volume, brightness,
or applying image filters.

## Installation

```sh
yarn add @chakra-ui/slider

# or

npm i @chakra-ui/slider
```

## Import components

```js
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"
```

## Usage

```jsx
<Slider defaultValue={30}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

### Changing the slider color

```jsx
<Slider colorScheme="pink" defaultValue={30}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>
```

### Customized Sliders

Slider component was designed to be composed to make it easy for you to
customize its styles.

```jsx
<Slider defaultValue={30}>
  <SliderTrack bg="red.100">
    <SliderFilledTrack bg="tomato" />
  </SliderTrack>
  <SliderThumb size={6}>
    <Box color="tomato" as={MdGraphicEq} />
  </SliderThumb>
</Slider>
```
