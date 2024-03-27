import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useSwitchContext, useSwitchStyles } from "./switch-context"

export interface SwitchThumbProps extends HTMLChakraProps<"span"> {}

export const SwitchThumb = forwardRef<SwitchThumbProps, "span">(
  function SwitchThumb(props, ref) {
    const styles = useSwitchStyles()
    const { getIndicatorProps } = useSwitchContext()

    return (
      <chakra.span
        __css={styles.thumb}
        className="chakra-switch__thumb"
        {...getIndicatorProps(props, ref)}
      />
    )
  },
)

SwitchThumb.displayName = "SwitchThumb"
