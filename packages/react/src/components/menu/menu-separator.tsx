"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuSeparatorProps extends HTMLChakraProps<"div"> {}

export const MenuSeparator: React.FC<MenuSeparatorProps> = (props) => {
  const styles = useMenuStyles()
  return (
    <chakra.div
      role="separator"
      aria-orientation="horizontal"
      {...props}
      className={cx("chakra-menu__divider", props.className)}
      css={[styles.separator, props.css]}
    />
  )
}

MenuSeparator.displayName = "MenuSeparator"
