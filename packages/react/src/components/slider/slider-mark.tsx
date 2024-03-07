import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderMarkProps extends HTMLChakraProps<"div"> {
  value: number
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */

export const SliderMark = forwardRef<SliderMarkProps, "div">(
  function SliderMark(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getMarkerProps(props, ref)}
        className={cx("chakra-slider__marker", props.className)}
        css={[styles.mark, props.css]}
      />
    )
  },
)

SliderMark.displayName = "SliderMark"
