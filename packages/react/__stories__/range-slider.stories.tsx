import * as React from "react"
import { Box } from "../src"
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  useRangeSlider,
} from "../src/components/slider"
import { chakra } from "../src/styled-system"

export default {
  title: "Forms / Range Slider",
  decorators: [
    (story: Function) => (
      <Box maxWidth="400px" height="300px" mx="auto" mt="40px">
        {story()}
      </Box>
    ),
  ],
}

export const HookUsage = () => {
  const api = useRangeSlider({
    defaultValue: [10, 40],
    minStepsBetweenThumbs: 5,
  })

  return (
    <>
      <chakra.div width="full" {...api.getRootProps()}>
        <chakra.div height="4px" bg="gray.300" {...api.getTrackProps()}>
          <chakra.div
            bg="blue.400"
            height="full"
            {...api.getInnerTrackProps()}
          />
        </chakra.div>
        {api.state.value.map((v, i) => (
          <chakra.div
            w="4"
            h="4"
            bg="black"
            rounded="full"
            transform="translateY(-50%)"
            key={i}
            {...api.getThumbProps({ index: i })}
          />
        ))}
      </chakra.div>
      <pre>{JSON.stringify(api.state.value)}</pre>
    </>
  )
}

export function HorizontalSlider() {
  return (
    <RangeSlider onChangeEnd={console.log}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}

export function VerticalSlider() {
  return (
    <RangeSlider orientation="vertical" onChangeEnd={console.log}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}

export function SteppedHorizontalSlider() {
  const [value, setValue] = React.useState([3, 10])
  return (
    <RangeSlider
      colorScheme="pink"
      value={value}
      onChange={setValue}
      min={1}
      max={20}
      step={2}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} />
      <RangeSliderThumb index={1} />
    </RangeSlider>
  )
}

export function DynamicSlider() {
  const [points, setPoints] = React.useState<number[]>([30, 70])

  React.useEffect(() => {
    setTimeout(() => {
      setPoints([30, 50, 70])
    }, 1000)
  }, [])

  return (
    <RangeSlider value={points} onChange={setPoints}>
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      {points.map((_p, index) => (
        <RangeSliderThumb key={index} index={index} />
      ))}
    </RangeSlider>
  )
}
