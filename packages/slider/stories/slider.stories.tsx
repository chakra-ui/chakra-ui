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

export const SliderBug = () => {
  return (
    <Slider defaultValue={10} min={0} max={20} step={5}>
      <SliderTrack bg="red.100">
        <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <SliderThumb boxSize={6} />
    </Slider>
  )
}

export const SliderOnChangeBug = () => {
  const [value, setValue] = React.useState(10)
  const [counter, setCounter] = React.useState(0)

  return (
    <div>
      <Slider
        min={0}
        max={20}
        step={5}
        value={value}
        onChange={(value) => {
          setCounter((c) => c + 1)
          setValue(value)
        }}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <chakra.div mt="10px">Value: {value}</chakra.div>
      <chakra.div mt="10px">Change Count: {counter}</chakra.div>
    </div>
  )
}

export function HorizontalSlider() {
  return (
    <Slider colorScheme="red" onChangeEnd={console.log}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={90} top="20px">
        "90%"
      </SliderMark>
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

export function SteppedHorizontalSlider() {
  const [value, setValue] = React.useState<number>(1)
  return (
    <Slider value={value} onChange={setValue} min={1} max={7} step={2}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb children={value} boxSize="30px" color="black" />
    </Slider>
  )
}
