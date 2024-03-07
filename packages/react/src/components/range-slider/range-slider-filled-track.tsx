import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  useRangeSliderContext,
  useRangeSliderStyles,
} from "./range-slider-context"

export interface RangeSliderFilledTrackProps extends HTMLChakraProps<"div"> {}

export const RangeSliderFilledTrack = forwardRef<
  RangeSliderFilledTrackProps,
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
