import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchTrackProps extends HTMLChakraProps<"span"> {}

export const SwitchTrack = forwardRef<SwitchTrackProps, "span">(
  function SwitchTrack(props, ref) {
    const styles = useSwitchStyles()
    const { getLabelProps } = useSwitchContext()

    const trackStyles = defineStyle({
      display: "inline-flex",
      flexShrink: 0,
      justifyContent: "flex-start",
      boxSizing: "content-box",
      cursor: "pointer",
      ...styles.track,
    })

    return (
      <chakra.span
        {...getLabelProps(props, ref)}
        className={cx("chakra-switch__track", props.className)}
        __css={trackStyles}
      />
    )
  },
)

SwitchTrack.displayName = "SwitchLabel"
