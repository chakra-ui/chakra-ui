import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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
        css={styles.track}
      />
    )
  },
)

SwitchTrack.displayName = "SwitchTrack"
