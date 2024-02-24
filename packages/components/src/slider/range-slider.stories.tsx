import { chakra, useTheme } from "../system"
import * as React from "react"
import {
  useRangeSlider,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "."

export default {
  title: "Forms / Range Slider",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" height="300px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const HookUsage = () => {
  const {
    state,
    getThumbProps,
    getInnerTrackProps,
    getRootProps,
    getTrackProps,
  } = useRangeSlider({
    direction: useTheme().direction,
    defaultValue: [10, 40],
    minStepsBetweenThumbs: 5,
  })

  return (
    <>
      <chakra.div width="full" {...getRootProps()}>
        <chakra.div height="4px" bg="gray.300" {...getTrackProps()}>
          <chakra.div bg="blue.400" height="full" {...getInnerTrackProps()} />
        </chakra.div>
        {state.value.map((v, i) => (
          <chakra.div
            w="4"
            h="4"
            bg="black"
            rounded="full"
            transform="translateY(-50%)"
            key={i}
            {...getThumbProps({ index: i })}
          />
        ))}
      </chakra.div>
      <pre>{JSON.stringify(state.value)}</pre>
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
