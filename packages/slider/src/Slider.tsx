import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
  ThemingProvider,
  useThemingContext,
} from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./Slider.hook"

type SliderContext = Omit<
  UseSliderReturn,
  "htmlProps" | "getInputProps" | "getRootProps"
>

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  strict: true,
  errorMessage:
    "[Chakra UI]: useSliderContext can only be used within SliderProvider",
})

export { SliderProvider, useSliderContext }

export type SliderProps = UseSliderProps &
  ThemingProps &
  Omit<PropsOf<typeof StyledSlider>, "onChange" | "size">

const StyledSlider = chakra("div", {
  themeKey: "Slider.Root",
  baseStyle: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
  },
})

export function Slider(props: SliderProps) {
  const defaults = useThemeDefaultProps("Slider")

  const {
    variant = defaults?.variant,
    size = defaults?.size,
    orientation = "horizontal",
    colorScheme,
    ...sliderProps
  } = props

  const themingProps = { variant, colorScheme, size, orientation }

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

const StyledThumb = chakra("div", {
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

const StyledTrack = chakra("div", {
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

const StyledInnerTrack = chakra("div", {
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

const StyledMarker = chakra("div")

export function SliderMark(props: SliderMarkProps) {
  const { getMarkerProps } = useSliderContext()
  return <StyledMarker data-chakra-slider-mark="" {...getMarkerProps(props)} />
}
