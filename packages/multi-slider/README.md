# @chakra-ui/multi-slider

The Multi-Thumb Slider is used to allow users to make selections from a range of
values.

Multi-THumb Sliders reflect a range of values along a bar, from which users may
select varius values. They are ideal for picking price filters or other type of
filters.

## Installation

```sh
yarn add @chakra-ui/multi-slider

# or

npm i @chakra-ui/multi-slider
```

## Import components

```js
import {
  MultiSlider,
  MultiSliderTrack,
  MultiSliderFilledTrack,
  MultiSliderThumb,
} from "@chakra-ui/react"
```

## Usage

```jsx
<MultiSlider>
  <MultiSliderTrack>
    <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
  </MultiSliderTrack>
  <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={10} />
  <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={15} />
</MultiSlider>
```

### Changing the slider color

```jsx
<MultiSlider colorScheme="red">
  <MultiSliderTrack>
    <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
  </MultiSliderTrack>
  <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={10} />
  <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={15} />
</MultiSlider>
```

### Use local maximim and minimum

```jsx
<MultiSlider colorScheme="red" min={0} max={100} step={5}>
  <MultiSliderTrack>
    <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
  </MultiSliderTrack>
  <MultiSliderThumb
    thumbKey={0}
    aria-label="slider 0"
    defaultValue={10}
    max={10}
  />
  <MultiSliderThumb
    thumbKey={1}
    aria-label="slider 1"
    defaultValue={15}
    min={10}
  />
</MultiSlider>
```
