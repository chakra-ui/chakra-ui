import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useProgressStyles } from "./progress-context"

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

export const ProgressTrack = forwardRef<ProgressTrackProps, "div">(
  function ProgressTrack(props, ref) {
    const styles = useProgressStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        css={styles.track}
        className={cx("chakra-progress__track", props.className)}
      />
    )
  },
)

ProgressTrack.displayName = "ProgressTrack"
