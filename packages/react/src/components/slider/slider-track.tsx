import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

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
