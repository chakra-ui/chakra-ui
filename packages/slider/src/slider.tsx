import {
  chakra,
  PropsOf,
  ThemingProps,
  ThemingProvider,
  useThemeDefaultProps,
  useThemingContext,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"

interface SliderContextType
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContextType>({
  name: "SliderContext",
  errorMessage: "useSliderContext can only be used within SliderProvider",
})

export { SliderProvider, useSliderContext }

/**
 * Slider - Theming
 *
 * To style the slider filled track globally, change the
 * styles in `theme.components.Slider` under `Thumb` key.
 */
const StyledSlider = chakra("div", {
  themeKey: "Slider.Root",
  baseStyle: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
  },
})

export type SliderProps = UseSliderProps &
  ThemingProps &
  Omit<PropsOf<typeof StyledSlider>, "onChange" | "size">

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/components/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export const Slider = React.forwardRef(function Slider(
  props: SliderProps,
  ref: React.Ref<any>,
) {
  const defaults = useThemeDefaultProps("Slider")

  const {
    variant = defaults?.variant,
    size = defaults?.size,
    orientation = "horizontal",
    colorScheme,
    ...sliderProps
  } = props

  const themingProps = { variant, colorScheme, size, orientation }

  const { getInputProps, getRootProps, ...context } = useSlider({
    ...sliderProps,
    orientation,
  })

  return (
    <SliderProvider value={context}>
      <ThemingProvider value={themingProps}>
        <StyledSlider
          className="chakra-slider"
          {...themingProps}
          {...getRootProps()}
        >
          {props.children}
          <input {...getInputProps({ ref })} />
        </StyledSlider>
      </ThemingProvider>
    </SliderProvider>
  )
})

if (__DEV__) {
  Slider.displayName = "Slider"
}

/**
 * SliderThumb - Theming
 *
 * To style the slider thumb globally, change the
 * styles in `theme.components.Slider` under `Thumb` key.
 */
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

export type SliderThumbProps = PropsOf<typeof StyledThumb>

/**
 * SliderThumb
 *
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 *
 * @see Docs https://chakra-ui.com/components/slider
 */
export function SliderThumb(props: SliderThumbProps) {
  const { getThumbProps } = useSliderContext()
  const themingProps = useThemingContext()
  return (
    <StyledThumb
      className="chakra-slider__thumb"
      {...themingProps}
      {...getThumbProps(props)}
    />
  )
}

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb"
}

/**
 * SliderTrack - Theming
 *
 * To style the slider track globally, change the
 * styles in `theme.components.Slider` under `Track` key.
 */
const StyledTrack = chakra("div", {
  themeKey: "Slider.Track",
  baseStyle: {
    overflow: "hidden",
  },
})

export type SliderTrackProps = PropsOf<typeof StyledTrack>

/**
 * SliderTrack
 *
 * Slider component that indicates the slider track.
 * @see Docs https://chakra-ui.com/components/slider
 */
export function SliderTrack(props: SliderTrackProps) {
  const { getTrackProps } = useSliderContext()
  const themingProps = useThemingContext()
  return (
    <StyledTrack
      className="chakra-slider__track"
      {...themingProps}
      {...getTrackProps(props)}
    />
  )
}

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack"
}

/**
 * SliderFilledTrack - Theming
 *
 * To style the slider filled track globally, change the
 * styles in `theme.components.Slider` under `FilledTrack` key.
 */
const StyledFilledTrack = chakra("div", {
  themeKey: "Slider.FilledTrack",
  baseStyle: {
    width: "inherit",
    height: "inherit",
  },
})

export type SliderInnerTrackProps = PropsOf<typeof StyledFilledTrack>

/**
 * SliderFilledTrack
 *
 * Slider component that indicates the slider value along the
 * track. It shows the filled part of the slider
 *
 * @see Docs https://chakra-ui.com/components/slider
 */
export function SliderFilledTrack(props: SliderInnerTrackProps) {
  const { getInnerTrackProps } = useSliderContext()
  const themingProps = useThemingContext()
  return (
    <StyledFilledTrack
      className="chakra-slider__filled-track"
      {...themingProps}
      {...getInnerTrackProps(props)}
    />
  )
}

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack"
}

export type SliderMarkProps = PropsOf<typeof StyledMarker> & { value: number }

const StyledMarker = chakra("div")

/**
 * SliderMark
 *
 * React component used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/components/slider
 */
export function SliderMark(props: SliderMarkProps) {
  const { getMarkerProps } = useSliderContext()
  return (
    <StyledMarker
      className="chakra-slider__marker"
      {...getMarkerProps(props)}
    />
  )
}

if (__DEV__) {
  SliderMark.displayName = "SliderMark"
}
