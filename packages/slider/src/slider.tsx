import { createContext } from "@chakra-ui/react-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  useTheme,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"

interface SliderContext
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: "SliderContext",
  errorMessage:
    "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />",
})

export { SliderProvider, useSliderContext }

export interface SliderProps
  extends UseSliderProps,
    ThemingProps<"Slider">,
    Omit<HTMLChakraProps<"div">, keyof UseSliderProps> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export const Slider = forwardRef<SliderProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Slider", props)
  const ownProps = omitThemingProps(props)
  const { direction } = useTheme()
  ownProps.direction = direction

  const { getInputProps, getRootProps, ...context } = useSlider(ownProps)

  const rootProps = getRootProps()
  const inputProps = getInputProps({}, ref)

  return (
    <SliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          {...rootProps}
          className="chakra-slider"
          __css={styles.container}
        >
          {props.children}
          <input {...inputProps} />
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

export interface SliderThumbProps extends HTMLChakraProps<"div"> {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">((props, ref) => {
  const { getThumbProps } = useSliderContext()
  const styles = useStyles()
  const thumbProps = getThumbProps(props, ref)

  return (
    <chakra.div
      {...thumbProps}
      className={cx("chakra-slider__thumb", props.className)}
      __css={styles.thumb}
    />
  )
})

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb"
}

export interface SliderTrackProps extends HTMLChakraProps<"div"> {}

export const SliderTrack = forwardRef<SliderTrackProps, "div">((props, ref) => {
  const { getTrackProps } = useSliderContext()
  const styles = useStyles()
  const trackProps = getTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className={cx("chakra-slider__track", props.className)}
      __css={styles.track}
    />
  )
})

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack"
}

export interface SliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const SliderFilledTrack = forwardRef<SliderInnerTrackProps, "div">(
  (props, ref) => {
    const { getInnerTrackProps } = useSliderContext()
    const styles = useStyles()
    const trackProps = getInnerTrackProps(props, ref)

    return (
      <chakra.div
        {...trackProps}
        className="chakra-slider__filled-track"
        __css={styles.filledTrack}
      />
    )
  },
)

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack"
}

export interface SliderMarkProps extends HTMLChakraProps<"div"> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */
export const SliderMark = forwardRef<SliderMarkProps, "div">((props, ref) => {
  const { getMarkerProps } = useSliderContext()
  const markProps = getMarkerProps(props, ref)
  return (
    <chakra.div
      {...markProps}
      className={cx("chakra-slider__marker", props.className)}
    />
  )
})

if (__DEV__) {
  SliderMark.displayName = "SliderMark"
}
