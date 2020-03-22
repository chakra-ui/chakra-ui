import {
  PropsOf,
  createChakra,
  ThemingProps,
  useComponentDefaults,
} from "@chakra-ui/system"
import * as React from "react"
import { SliderHookProps, useSlider, SliderHookReturn } from "./Slider.hook"
import { createContext } from "@chakra-ui/utils"

type SliderContext = Omit<
  SliderHookReturn,
  "htmlProps" | "getInputProps" | "getRootProps"
>

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  strict: true,
  errorMessage: "useSliderContext can only be used within SliderProvider",
})

export { SliderProvider, useSliderContext }

const [ThemingProvider, useThemingContext] = createContext<ThemingProps>()

export type SliderProps = SliderHookProps &
  ThemingProps &
  Omit<PropsOf<typeof StyledSlider>, "onChange" | "size">

const StyledSlider = createChakra("div", {
  themeKey: "Slider.Root",
  baseStyle: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
  },
})

export function Slider(props: SliderProps) {
  const defaults = useComponentDefaults("Slider")
  const {
    variant = defaults.variant,
    variantSize = defaults.variantSize,
    orientation = "horizontal",
    variantColor,
    ...sliderProps
  } = props

  const themingProps = { variant, variantColor, variantSize, orientation }

  const { htmlProps, getInputProps, getRootProps, ...context } = useSlider({
    ...sliderProps,
    orientation,
  })

  return (
    <SliderProvider value={context}>
      <ThemingProvider value={themingProps}>
        <StyledSlider
          touch-action="none"
          data-chakra-slider=""
          {...themingProps}
          {...getRootProps(htmlProps)}
        >
          {props.children}
          <input {...getInputProps()} />
        </StyledSlider>
      </ThemingProvider>
    </SliderProvider>
  )
}

const StyledThumb = createChakra("div", {
  themeKey: "Slider.Thumb",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    outline: 0,
  },
})

export type SliderThumbProps = PropsOf<typeof StyledSlider>

export function SliderThumb(props: SliderThumbProps) {
  const { getThumbProps } = useSliderContext()
  const themingProps = useThemingContext()
  return (
    <StyledThumb
      {...themingProps}
      data-chakra-slider-thumb=""
      {...getThumbProps(props)}
    />
  )
}

const StyledTrack = createChakra("div", {
  themeKey: "Slider.Track",
  baseStyle: {
    overflow: "hidden",
  },
})

export type SliderTrackProps = PropsOf<typeof StyledTrack>

export function SliderTrack(props: SliderTrackProps) {
  const { getTrackProps } = useSliderContext()
  const themingProps = useThemingContext()

  return (
    <StyledTrack
      {...themingProps}
      data-chakra-slider-track=""
      {...getTrackProps(props)}
    />
  )
}

const StyledInnerTrack = createChakra("div", {
  themeKey: "Slider.FilledTrack",
  baseStyle: {
    width: "inherit",
    height: "inherit",
  },
})

export type SliderInnerTrackProps = PropsOf<typeof StyledInnerTrack>

export function SliderFilledTrack(props: SliderInnerTrackProps) {
  const { getInnerTrackProps } = useSliderContext()
  const themingProps = useThemingContext()

  return (
    <StyledInnerTrack
      {...themingProps}
      data-chakra-slider-filled-track=""
      {...getInnerTrackProps(props)}
    />
  )
}

export type SliderMarkProps = PropsOf<typeof StyledMarker> & { value: number }

const StyledMarker = createChakra("div")

export function SliderMark(props: SliderMarkProps) {
  const { getMarkerProps } = useSliderContext()
  return <StyledMarker data-chakra-slider-mark="" {...getMarkerProps(props)} />
}
