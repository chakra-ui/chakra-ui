import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"

export interface MenuPositionerProps extends HTMLChakraProps<"div"> {}

export const MenuPositioner = forwardRef<MenuPositionerProps, "div">(
  function MenuPositioner(props, ref) {
    const api = useMenuContext()
    const styles = useMenuStyles()

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        css={{ zIndex: props.zIndex ?? styles.content?.zIndex }}
      />
    )
  },
)

MenuPositioner.displayName = "MenuPositioner"
