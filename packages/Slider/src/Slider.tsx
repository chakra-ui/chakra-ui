import * as React from "react"
import {
  useSlider,
  useSliderThumb,
  useSliderTrack,
  useSliderContext,
  SliderProvider,
  SliderHookProps,
  useSliderRoot,
  useSliderMarker,
  useSliderInnerTrack,
} from "./Slider.hook"
import { PropsOf } from "@chakra-ui/system"

export function BaseSliderThumb(props: PropsOf<"div">) {
  const thumbProps = useSliderThumb(props)
  return <div data-chakra-slider-thumb="" {...thumbProps} />
}

export function BaseSliderTrack(props: PropsOf<"div">) {
  const trackProps = useSliderTrack(props)
  return <div data-chakra-slider-track="" {...trackProps} />
}

function BaseSliderRoot(props: PropsOf<"div">) {
  const slider = useSliderContext()
  const rootProps = useSliderRoot(props)
  return (
    <div data-chakra-slider="" {...rootProps}>
      {props.children}
      <input
        type="hidden"
        name={slider.name}
        value={slider.value}
        id={slider.id}
      />
    </div>
  )
}

export function BaseSlider(props: SliderHookProps & PropsOf<"div">) {
  const slider = useSlider(props)
  return (
    <SliderProvider value={slider}>
      <BaseSliderRoot {...slider.htmlProps} />
    </SliderProvider>
  )
}

export function BaseSliderMark(props: PropsOf<"div"> & { value: number }) {
  const markProps = useSliderMarker(props)
  return <div data-chakra-slider-mark="" {...markProps} />
}

export function BaseSliderFilledTrack(props: PropsOf<"div">) {
  const innerTrackProps = useSliderInnerTrack(props)
  return <div data-chakra-slider-filled-track="" {...innerTrackProps} />
}
