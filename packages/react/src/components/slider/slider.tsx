import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  SliderProvider,
  SliderStylesProvider,
  useSliderContext,
  useSliderStyles,
} from "./slider-context"
import { splitSliderProps } from "./slider-props"
import { UseSliderProps, useSlider } from "./use-slider"

export interface SliderProps
  extends SystemRecipeProps<"Slider">,
    HTMLChakraProps<"div", UseSliderProps> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export const Slider = forwardRef<SliderProps, "div">((props, ref) => {
  const sliderProps: SliderProps = {
    ...props,
    orientation: props?.orientation ?? "horizontal",
  }

  const recipe = useSlotRecipe("Slider")
  const [variantProps, localProps] = recipe.splitVariantProps(sliderProps)
  const styles = recipe(variantProps)

  // const { direction } = useTheme()
  // ownProps.direction = direction

  const [useSliderProps, elementProps] = splitSliderProps(localProps)
  const api = useSlider(useSliderProps)

  return (
    <SliderProvider value={api}>
      <SliderStylesProvider value={styles}>
        <chakra.div
          {...elementProps}
          className={cx("chakra-slider", sliderProps.className)}
          css={styles.root}
        >
          {sliderProps.children}
          <input {...api.getInputProps({}, ref)} />
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
export const SliderThumb = forwardRef<SliderThumbProps, "div">(
  function SliderThumb(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getThumbProps(props, ref)}
        className={cx("chakra-slider__thumb", props.className)}
        css={styles.thumb}
      />
    )
  },
)

SliderThumb.displayName = "SliderThumb"

export interface SliderTrackProps extends HTMLChakraProps<"div"> {}

export const SliderTrack = forwardRef<SliderTrackProps, "div">(
  function SliderTrack(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getTrackProps(props, ref)}
        className={cx("chakra-slider__track", props.className)}
        css={styles.track}
      />
    )
  },
)

SliderTrack.displayName = "SliderTrack"

export interface SliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const SliderFilledTrack = forwardRef<SliderInnerTrackProps, "div">(
  function SliderFilledTrack(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getInnerTrackProps(props, ref)}
        className={cx("chakra-slider__filled-track", props.className)}
        css={styles.filledTrack}
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
      css={styles.mark}
    />
  )
})

SliderMark.displayName = "SliderMark"
