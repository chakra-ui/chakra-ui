import * as React from "react"
import {
  ThemingProps,
  HTMLChakraProps,
  useMultiStyleConfig,
  forwardRef,
  StylesProvider,
  useStyles,
  chakra,
  omitThemingProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import {
  MultiSliderContextValue,
  MultiSliderProvider,
} from "./multi-slider-context"
import { useMultiSliderRoot } from "./use-multi-slider-root"
import { useMultiSliderTrack } from "./use-multi-slider-track"
import {
  useMultiSliderThumb,
  UseMultiSliderThumbProps,
} from "./use-multi-slider-thumb"
import {
  useMultiSliderInnerTrack,
  UseMultiSliderInnerTrackProps,
} from "./use-multi-slider-inner-track"

export interface MultiSliderProps
  extends Partial<Omit<MultiSliderContextValue, "values" | "setThumbValue">>,
    ThemingProps<"Slider">,
    HTMLChakraProps<"div"> {}

export const MultiSlider = forwardRef<MultiSliderProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("Slider", props)
  const {
    min,
    max,
    orientation,
    step,
    isDisabled,
    isReadOnly,
    isReversed,
    ...otherProps
  } = props
  const containerProps = omitThemingProps(otherProps)

  return (
    <MultiSliderProvider
      min={min ?? 0}
      max={max ?? 100}
      orientation={orientation ?? "horizontal"}
      step={step ?? 1}
      isDisabled={isDisabled ?? false}
      isReadOnly={isReadOnly ?? false}
      isReversed={isReversed ?? false}
    >
      <StylesProvider value={styles}>
        <MultiSliderContainer ref={ref} {...containerProps} />
      </StylesProvider>
    </MultiSliderProvider>
  )
})
MultiSlider.defaultProps = {
  orientation: "horizontal",
}
if (__DEV__) {
  MultiSlider.displayName = "MultiSlider"
}

const MultiSliderContainer = forwardRef<HTMLChakraProps<"div">, "div">(
  (props, ref) => {
    const styles = useStyles()
    const { getRootProps } = useMultiSliderRoot()
    const rootProps = getRootProps(props)

    return (
      <chakra.div
        ref={ref}
        {...rootProps}
        className="chakra-multi-slider"
        __css={{
          display: "inline-block",
          position: "relative",
          ...styles.container,
        }}
      >
        {props.children}
      </chakra.div>
    )
  },
)
if (__DEV__) {
  MultiSliderContainer.displayName = "MultiSliderContainer"
}

export interface MultiSliderTrackProps extends HTMLChakraProps<"div"> {}

export const MultiSliderTrack = forwardRef<MultiSliderTrackProps, "div">(
  (props, ref) => {
    const { getTrackProps } = useMultiSliderTrack()
    const trackProps = getTrackProps(props, ref)
    const styles = useStyles()

    return (
      <chakra.div
        {...trackProps}
        className={cx("chakra-multi-slider__track", props.className)}
        __css={{
          overflow: "hidden",
          ...styles.track,
        }}
      />
    )
  },
)
if (__DEV__) {
  MultiSliderTrack.displayName = "MultiSliderTrack"
}

export interface MultiSliderThumbProps
  extends Omit<HTMLChakraProps<"div">, "defaultValue">,
    UseMultiSliderThumbProps {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const MultiSliderThumb = forwardRef<MultiSliderThumbProps, "div">(
  (
    {
      thumbKey,
      min,
      max,
      value,
      defaultValue,
      onValueChangeStart,
      onValueChangeEnd,
      onValueChange,
      id,
      name,
      getAriaValueText,
      "aria-label": ariaLabel,
      "aria-valuetext": ariaValueText,
      "aria-labelledby": ariaLabelledby,
      ...props
    },
    ref,
  ) => {
    const { getThumbProps, getInputProps } = useMultiSliderThumb({
      thumbKey,
      min,
      max,
      value,
      defaultValue,
      onValueChangeStart,
      onValueChangeEnd,
      onValueChange,
      id,
      name,
      getAriaValueText,
      "aria-label": ariaLabel,
      "aria-valuetext": ariaValueText,
      "aria-labelledby": ariaLabelledby,
    })
    const thumbProps = getThumbProps(props, ref)
    const inputProps = getInputProps(props, ref)
    const styles = useStyles()

    return (
      <>
        <chakra.div
          {...thumbProps}
          className={cx("chakra-multi-slider__thumb", props.className)}
          __css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: 0,
            cursor: "pointer",
            ...styles.thumb,
          }}
        />
        <input {...inputProps} />
      </>
    )
  },
)

if (__DEV__) {
  MultiSliderThumb.displayName = "MultiSliderThumb"
}

export interface MultiSliderInnerTrackProps
  extends HTMLChakraProps<"div">,
    UseMultiSliderInnerTrackProps {}

export const MultiSliderFilledTrack = forwardRef<
  MultiSliderInnerTrackProps,
  "div"
>(({ startThumbKey, endThumbKey, ...props }, ref) => {
  const { getInnerTrackProps } = useMultiSliderInnerTrack({
    startThumbKey,
    endThumbKey,
  })

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
  MultiSliderFilledTrack.displayName = "MultiSliderFilledTrack"
}
