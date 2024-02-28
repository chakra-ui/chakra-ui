import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useMenuStyles } from "./menu-context"
import { useMenuPositioner } from "./use-menu"

export interface MenuPositionerProps extends HTMLChakraProps<"div"> {}

export const MenuPositioner = forwardRef<MenuPositionerProps, "div">(
  function MenuPositioner(props, ref) {
    const positionerProps = useMenuPositioner(props, ref)
    const styles = useMenuStyles()

    return (
      <chakra.div
        {...positionerProps}
        __css={{ zIndex: props.zIndex ?? styles.content?.zIndex }}
      />
    )
  },
)

MenuPositioner.displayName = "MenuPositioner"
