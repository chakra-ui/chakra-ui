"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuGroupProps extends HTMLChakraProps<"div"> {}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  function MenuGroup(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.div
        role="group"
        {...props}
        ref={ref}
        className={cx("chakra-menu__group", props.className)}
        css={[styles.group, props.css]}
      />
    )
  },
)

MenuGroup.displayName = "MenuGroup"
