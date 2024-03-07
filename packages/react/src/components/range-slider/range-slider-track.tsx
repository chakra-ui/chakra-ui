import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

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
