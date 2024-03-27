import { chakra, forwardRef } from "../system"
import { useMenuStyles } from "./menu-context"
import { StyledMenuItemProps } from "./menu-item"

export const StyledMenuItem = forwardRef<StyledMenuItemProps, "button">(
  function StyledMenuItem(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.button ref={ref} type="button" {...props} __css={styles.item} />
    )
  },
)
