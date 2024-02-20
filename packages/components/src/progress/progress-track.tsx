import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useProgressStyles } from "./progress-context"

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

export const ProgressTrack = forwardRef<ProgressTrackProps, "div">(
  function ProgressTrack(props, ref) {
    const styles = useProgressStyles()

    const borderRadius = props.borderRadius ?? styles.track?.borderRadius

    const trackStyles = defineStyle({
      overflow: "hidden",
      position: "relative",
      ...styles.track,
    })

    return (
      <chakra.div
        ref={ref}
        {...props}
        borderRadius={borderRadius as any}
        __css={trackStyles}
        className={cx("chakra-progress__track", props.className)}
      />
    )
  },
)

ProgressTrack.displayName = "ProgressTrack"
