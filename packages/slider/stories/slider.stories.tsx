import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
} from "../src"

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
    <Slider colorScheme="red" onChangeEnd={console.log}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={90} children="90%" top="20px" />
    </Slider>
  )
}

export function VerticalSlider() {
  return (
    <Slider colorScheme="red" isReversed orientation="vertical">
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
    <Slider colorScheme="blue" defaultValue={40}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb children="#" boxSize="30px" color="black" />
    </Slider>
  )
}
