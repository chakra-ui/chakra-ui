import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  MultiSlider,
  MultiSliderTrack,
  MultiSliderThumb,
  MultiSliderFilledTrack,
} from "../src"

export default {
  title: "MultiSlider",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" height="300px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Horizontal = () => {
  return (
    <MultiSlider min={0} max={20} step={5}>
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb
        thumbKey={0}
        aria-label="horizontal 0"
        defaultValue={5}
      />
      <MultiSliderThumb
        thumbKey={1}
        aria-label="horizontal 1"
        defaultValue={15}
      />
    </MultiSlider>
  )
}

export const Vertical = () => {
  return (
    <MultiSlider min={0} max={20} step={5} orientation="vertical">
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={5} />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={15} />
    </MultiSlider>
  )
}

export const ReverseHorizontal = () => {
  return (
    <MultiSlider min={0} max={20} step={5} isReversed>
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={15} />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={5} />
    </MultiSlider>
  )
}

export const ReverseVertical = () => {
  return (
    <MultiSlider min={0} max={20} step={5} orientation="vertical" isReversed>
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={15} />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={5} />
    </MultiSlider>
  )
}

export const FourThumbs = () => {
  return (
    <MultiSlider>
      <MultiSliderTrack>
        <MultiSliderFilledTrack startThumbKey={0} endThumbKey={1} />
        <MultiSliderFilledTrack startThumbKey={2} endThumbKey={3} />
      </MultiSliderTrack>
      <MultiSliderThumb thumbKey={0} aria-label="slider 0" defaultValue={0} />
      <MultiSliderThumb thumbKey={1} aria-label="slider 1" defaultValue={25} />
      <MultiSliderThumb thumbKey={2} aria-label="slider-2" defaultValue={50} />
      <MultiSliderThumb thumbKey={3} aria-label="slider-3" defaultValue={75} />
    </MultiSlider>
  )
}
