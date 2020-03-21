import { chakra, createChakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
} from "./Slider"

export default {
  title: "Slider",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" height="300px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export function HorizontalSlider() {
  return (
    <Slider variantColor="red">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={90} children="90%" top="30px" />
    </Slider>
  )
}

export function VerticalSlider() {
  return (
    <Slider variantColor="red" orientation="vertical">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={90} children="90%" left="40px" />
    </Slider>
  )
}

export function ChakraHorizontalSlider() {
  return (
    <Slider variantColor="blue" defaultValue={40}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb children="#" size="30px" color="black" />
    </Slider>
  )
}
