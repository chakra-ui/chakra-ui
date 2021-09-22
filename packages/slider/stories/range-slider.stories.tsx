import { chakra, useTheme } from "@chakra-ui/system"
import * as React from "react"
import {
  useRangeSlider,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "../src"

export default {
  title: "Range Slider",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" mx="auto" mt="40px">
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
    defaultValue: [40, 80],
    onChange: (v) => console.log(v.toString()),
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
