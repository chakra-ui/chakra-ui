import { cx } from "@chakra-ui/utils"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchTrackProps extends HTMLChakraProps<"span"> {}

export const SwitchTrack = forwardRef<SwitchTrackProps, "span">(
  function SwitchTrack(props, ref) {
    const styles = useSwitchStyles()
    const api = useSwitchContext()
    return (
      <chakra.span
        {...api.getLabelProps(props, ref)}
        className={cx("chakra-switch__track", props.className)}
        __css={styles.track}
      />
    )
  },
)

SwitchTrack.displayName = "SwitchTrack"
