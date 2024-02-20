import { defineStyle } from "@chakra-ui/styled-system"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchLabelProps extends HTMLChakraProps<"label"> {}

export const SwitchLabel = forwardRef<SwitchLabelProps, "span">(
  function SwitchLabel(props, ref) {
    const styles = useSwitchStyles()
    const { getLabelProps, spacing } = useSwitchContext()

    const labelStyles = defineStyle({
      userSelect: "none",
      marginStart: spacing,
      ...styles.label,
    })

    return (
      <chakra.span
        className="chakra-switch__label"
        {...getLabelProps(props, ref)}
        __css={labelStyles}
      />
    )
  },
)

SwitchLabel.displayName = "SwitchLabel"
