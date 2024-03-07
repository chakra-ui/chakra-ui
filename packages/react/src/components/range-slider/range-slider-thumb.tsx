import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

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
        css={[styles.thumb, props.css]}
      >
        {thumbProps.children}
        {api.name && <input {...api.getInputProps({ index: props.index })} />}
      </chakra.div>
    )
  },
)

RangeSliderThumb.displayName = "RangeSliderThumb"
