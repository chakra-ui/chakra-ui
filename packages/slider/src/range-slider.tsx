import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
  useTheme,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/react-utils"
import * as React from "react"
import {
  UseRangeSliderReturn,
  UseRangeSliderProps,
  useRangeSlider,
} from "./use-range-slider"

interface RangeSliderContext
  extends Omit<UseRangeSliderReturn, "getInputProps" | "getRootProps"> {}

const [
  RangeSliderProvider,
  useRangeSliderContext,
] = createContext<RangeSliderContext>({
  name: "SliderContext",
  errorMessage:
    "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <RangeSlider />",
})

export { RangeSliderProvider, useRangeSliderContext }

type Omitted = "size" | "defaultValue" | "onChange"
export interface RangeSliderProps
  extends UseRangeSliderProps,
    ThemingProps<"Slider">,
    Omit<HTMLChakraProps<"div">, Omitted> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export const RangeSlider = forwardRef<RangeSliderProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Slider", props)
  const ownProps = omitThemingProps(props)
  const { direction } = useTheme()
  ownProps.direction = direction

  const { getRootProps, ...context } = useRangeSlider(ownProps)

  const rootStyles: SystemStyleObject = {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    ...styles.container,
  }

  return (
    <RangeSliderProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div
          {...getRootProps({}, ref)}
          className="chakra-slider"
          __css={rootStyles}
        >
          {props.children}
        </chakra.div>
      </StylesProvider>
    </RangeSliderProvider>
  )
})

RangeSlider.defaultProps = {
  orientation: "horizontal",
}

if (__DEV__) {
  RangeSlider.displayName = "RangeSlider"
}

export interface RangeSliderThumbProps extends HTMLChakraProps<"div"> {
  index: number
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const RangeSliderThumb = forwardRef<RangeSliderThumbProps, "div">(
  (props, ref) => {
    const { getThumbProps } = useRangeSliderContext()

    const styles = useStyles()

    const thumbStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      outline: 0,
      ...styles.thumb,
    }

    const thumbProps = getThumbProps(props, ref)

    return (
      <chakra.div
        {...thumbProps}
        className={cx("chakra-slider__thumb", props.className)}
        __css={thumbStyles}
      />
    )
  },
)

if (__DEV__) {
  RangeSliderThumb.displayName = "RangeSliderThumb"
}

export interface RangeSliderTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderTrack = forwardRef<RangeSliderTrackProps, "div">(
  (props, ref) => {
    const { getTrackProps } = useRangeSliderContext()

    const styles = useStyles()
    const trackStyles = {
      overflow: "hidden",
      ...styles.track,
    }

    const trackProps = getTrackProps(props, ref)

    return (
      <chakra.div
        {...trackProps}
        className={cx("chakra-slider__track", props.className)}
        __css={trackStyles}
      />
    )
  },
)

if (__DEV__) {
  RangeSliderTrack.displayName = "RangeSliderTrack"
}

export interface RangeSliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderFilledTrack = forwardRef<
  RangeSliderInnerTrackProps,
  "div"
>((props, ref) => {
  const { getInnerTrackProps } = useRangeSliderContext()

  const styles = useStyles()
  const trackStyles = {
    width: "inherit",
    height: "inherit",
    ...styles.filledTrack,
  }

  const trackProps = getInnerTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className="chakra-slider__filled-track"
      __css={trackStyles}
    />
  )
})

if (__DEV__) {
  RangeSliderFilledTrack.displayName = "RangeSliderFilledTrack"
}

export interface RangeSliderMarkProps extends HTMLChakraProps<"div"> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */
export const RangeSliderMark = forwardRef<RangeSliderMarkProps, "div">(
  (props, ref) => {
    const { getMarkerProps } = useRangeSliderContext()
    const markProps = getMarkerProps(props, ref)
    return (
      <chakra.div
        {...markProps}
        className={cx("chakra-slider__marker", props.className)}
      />
    )
  },
)

if (__DEV__) {
  RangeSliderMark.displayName = "SliderMark"
}
