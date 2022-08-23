import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { useMenuStyles } from "./menu"

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
