import * as React from "react"
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "../src/components/slider"
import { chakra } from "../src/styled-system"

export default {
  title: "Forms / Slider",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" height="300px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

const DEFAULT_MAX_VALUE = 40

export const WithPropsUpdate = () => {
  const [count, setCount] = React.useState(0)
  const [isDisabled, setIsDisabled] = React.useState(true)
  const [max, setMax] = React.useState(DEFAULT_MAX_VALUE)

  React.useEffect(() => {
    const id = setTimeout(() => {
      setIsDisabled(false)
      setMax(150)
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    <chakra.div display="flex" flexDirection="column" gap="8">
      <h1>
        Slide max value: {max}, isDisabled: {String(isDisabled)}
      </h1>
      <Slider
        aria-label="Player Progress"
        min={0}
        max={max}
        isDisabled={isDisabled}
        defaultValue={0}
        value={count}
        onChange={setCount}
        mr="20"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </chakra.div>
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
