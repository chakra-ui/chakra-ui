import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
  StylesProvider,
  useStyles,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"

interface SliderContextType
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContextType>({
  name: "SliderContext",
  errorMessage:
    "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />",
})

export { SliderProvider, useSliderContext }

export type SliderProps = UseSliderProps &
  ThemingProps &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "size">

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
  const styles = useStyleConfig("Slider", props)
  const realProps = omitThemingProps(props)
  const { getInputProps, getRootProps, ...context } = useSlider(realProps)

  return (
    <SliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          {...getRootProps()}
          className="chakra-slider"
          __css={{
            display: "inline-block",
            position: "relative",
            cursor: "pointer",
            ...styles.container,
          }}
        >
          {props.children}
          <input {...getInputProps({ ref })} />
        </chakra.div>
      </StylesProvider>
    </SliderProvider>
  )
})

Slider.defaultProps = {
  orientation: "horizontal",
}

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
  const styles = useStyles()
  return (
    <StyledThumb
      {...getThumbProps(props)}
      className="chakra-slider__thumb"
      __css={styles.thumb}
    />
  )
}

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb"
}

export type SliderTrackProps = PropsOf<typeof chakra.div>

/**
 * SliderTrack
 *
 * Slider component that indicates the slider track.
 * @see Docs https://chakra-ui.com/components/slider
 */
export function SliderTrack(props: SliderTrackProps) {
  const { getTrackProps } = useSliderContext()
  const styles = useStyles()
  return (
    <chakra.div
      {...getTrackProps(props)}
      className="chakra-slider__track"
      __css={{
        overflow: "hidden",
        ...styles.track,
      }}
    />
  )
}

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack"
}

export type SliderInnerTrackProps = PropsOf<typeof chakra.div>

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
  const styles = useStyles()
  return (
    <chakra.div
      {...getInnerTrackProps(props)}
      className="chakra-slider__filled-track"
      __css={{
        width: "inherit",
        height: "inherit",
        ...styles.filledTrack,
      }}
    />
  )
}

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack"
}

export type SliderMarkProps = PropsOf<typeof chakra.div> & { value: number }

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
    <chakra.div className="chakra-slider__marker" {...getMarkerProps(props)} />
  )
}

if (__DEV__) {
  SliderMark.displayName = "SliderMark"
}
