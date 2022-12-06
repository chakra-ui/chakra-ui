import { createContext } from "@chakra-ui/react-context"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useTheme,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/utils"
import { useSlider, UseSliderProps, UseSliderReturn } from "./use-slider"

interface SliderContext
  extends Omit<UseSliderReturn, "getInputProps" | "getRootProps"> {}

const [SliderProvider, useSliderContext] = createContext<SliderContext>({
  name: "SliderContext",
  hookName: "useSliderContext",
  providerName: "<Slider />",
})

const [SliderStylesProvider, useSliderStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SliderStylesContext`,
  hookName: `useSliderStyles`,
  providerName: "<Slider />",
})

export { useSliderStyles }
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
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export const Slider = forwardRef<SliderProps, "div">((props, ref) => {
  const sliderProps: SliderProps = {
    orientation: "horizontal",
    ...props,
  }

  const styles = useMultiStyleConfig("Slider", sliderProps)
  const ownProps = omitThemingProps(sliderProps)

  const { direction } = useTheme()
  ownProps.direction = direction

  const { getInputProps, getRootProps, ...context } = useSlider(ownProps)

  const rootProps = getRootProps()
  const inputProps = getInputProps({}, ref)

  return (
    <SliderProvider value={context}>
      <SliderStylesProvider value={styles}>
        <chakra.div
          {...rootProps}
          className={cx("chakra-slider", sliderProps.className)}
          __css={styles.container}
        >
          {sliderProps.children}
          <input {...inputProps} />
        </chakra.div>
      </SliderStylesProvider>
    </SliderProvider>
  )
})

Slider.displayName = "Slider"

export interface SliderThumbProps extends HTMLChakraProps<"div"> {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">((props, ref) => {
  const { getThumbProps } = useSliderContext()
  const styles = useSliderStyles()
  const thumbProps = getThumbProps(props, ref)

  return (
    <chakra.div
      {...thumbProps}
      className={cx("chakra-slider__thumb", props.className)}
      __css={styles.thumb}
    />
  )
})

SliderThumb.displayName = "SliderThumb"

export interface SliderTrackProps extends HTMLChakraProps<"div"> {}

export const SliderTrack = forwardRef<SliderTrackProps, "div">((props, ref) => {
  const { getTrackProps } = useSliderContext()
  const styles = useSliderStyles()
  const trackProps = getTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className={cx("chakra-slider__track", props.className)}
      __css={styles.track}
    />
  )
})

SliderTrack.displayName = "SliderTrack"

export interface SliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const SliderFilledTrack = forwardRef<SliderInnerTrackProps, "div">(
  (props, ref) => {
    const { getInnerTrackProps } = useSliderContext()
    const styles = useSliderStyles()
    const trackProps = getInnerTrackProps(props, ref)

    return (
      <chakra.div
        {...trackProps}
        className={cx("chakra-slider__filled-track", props.className)}
        __css={styles.filledTrack}
      />
    )
  },
)

SliderFilledTrack.displayName = "SliderFilledTrack"

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
  const styles = useSliderStyles()
  const markProps = getMarkerProps(props, ref)
  return (
    <chakra.div
      {...markProps}
      className={cx("chakra-slider__marker", props.className)}
      __css={styles.mark}
    />
  )
})

SliderMark.displayName = "SliderMark"
