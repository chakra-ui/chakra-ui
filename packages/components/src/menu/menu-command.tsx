import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useMenuStyles } from "./menu-context"

export interface MenuCommandProps extends HTMLChakraProps<"span"> {}

export const MenuCommand = forwardRef<MenuCommandProps, "span">(
  (props, ref) => {
    const styles = useMenuStyles()
    return (
      <chakra.span
        ref={ref}
        {...props}
        __css={styles.command}
        className="chakra-menu__command"
      />
    )
  },
)

MenuCommand.displayName = "MenuCommand"
