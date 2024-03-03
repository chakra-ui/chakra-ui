import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  RangeSliderProvider,
  RangeSliderStylesProvider,
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./slider-context"
import { UseRangeSliderProps, useRangeSlider } from "./use-range-slider"

export interface RangeSliderProps
  extends UseRangeSliderProps,
    SystemRecipeProps<"Slider">,
    Omit<HTMLChakraProps<"div">, keyof UseRangeSliderProps> {}

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb/
 */
export const RangeSlider = forwardRef<RangeSliderProps, "div">(
  function RangeSlider(props, ref) {
    const sliderProps: RangeSliderProps = {
      orientation: "horizontal",
      ...props,
    }

    const recipe = useSlotRecipe("Slider")
    const [variantProps, localProps] = recipe.splitVariantProps(sliderProps)
    const styles = recipe(variantProps)

    // const { direction } = useTheme()
    // ownProps.direction = direction

    const api = useRangeSlider(localProps)
    const context = { ...api, name: localProps.name }

    return (
      <RangeSliderProvider value={context}>
        <RangeSliderStylesProvider value={styles}>
          <chakra.div
            {...api.getRootProps({}, ref)}
            className="chakra-slider"
            css={styles.root}
          >
            {sliderProps.children}
          </chakra.div>
        </RangeSliderStylesProvider>
      </RangeSliderProvider>
    )
  },
)

RangeSlider.displayName = "RangeSlider"

export interface RangeSliderThumbProps extends HTMLChakraProps<"div"> {
  index: number
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const RangeSliderThumb = forwardRef<RangeSliderThumbProps, "div">(
  function RangeSliderThumb(props, ref) {
    const api = useRangeSliderContext()
    const styles = useRangeSliderStyles()
    const thumbProps = api.getThumbProps(props, ref)

    return (
      <chakra.div
        {...thumbProps}
        className={cx("chakra-slider__thumb", props.className)}
        css={styles.thumb}
      >
        {thumbProps.children}
        {api.name && <input {...api.getInputProps({ index: props.index })} />}
      </chakra.div>
    )
  },
)

RangeSliderThumb.displayName = "RangeSliderThumb"

export interface RangeSliderTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderTrack = forwardRef<RangeSliderTrackProps, "div">(
  function RangeSliderTrack(props, ref) {
    const api = useRangeSliderContext()
    const styles = useRangeSliderStyles()
    const trackProps = api.getTrackProps(props, ref)

    return (
      <chakra.div
        {...trackProps}
        className={cx("chakra-slider__track", props.className)}
        css={styles.track}
        data-testid="chakra-range-slider-track"
      />
    )
  },
)

RangeSliderTrack.displayName = "RangeSliderTrack"

export interface RangeSliderInnerTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderFilledTrack = forwardRef<
  RangeSliderInnerTrackProps,
  "div"
>(function RangeSliderFilledTrack(props, ref) {
  const api = useRangeSliderContext()
  const styles = useRangeSliderStyles()
  const trackProps = api.getInnerTrackProps(props, ref)

  return (
    <chakra.div
      {...trackProps}
      className="chakra-slider__filled-track"
      css={styles.filledTrack}
    />
  )
})

RangeSliderFilledTrack.displayName = "RangeSliderFilledTrack"

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
  function RangeSliderMark(props, ref) {
    const api = useRangeSliderContext()
    const styles = useRangeSliderStyles()
    const markProps = api.getMarkerProps(props, ref)
    return (
      <chakra.div
        {...markProps}
        className={cx("chakra-slider__marker", props.className)}
        css={styles.mark}
      />
    )
  },
)

RangeSliderMark.displayName = "RangeSliderMark"
