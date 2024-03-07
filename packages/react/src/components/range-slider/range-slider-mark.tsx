import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

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
