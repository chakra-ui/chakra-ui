import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchLabelProps extends HTMLChakraProps<"label"> {}

export const SwitchLabel = forwardRef<SwitchLabelProps, "span">(
  function SwitchLabel(props, ref) {
    const styles = useSwitchStyles()
    const api = useSwitchContext()

    return (
      <chakra.span
        className="chakra-switch__label"
        {...api.getLabelProps(props, ref)}
        __css={styles.label}
      />
    )
  },
)

SwitchLabel.displayName = "SwitchLabel"
