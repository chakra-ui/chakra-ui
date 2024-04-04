"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuCommandProps extends HTMLChakraProps<"span"> {}

export const MenuCommand = forwardRef<HTMLSpanElement, MenuCommandProps>(
  function MenuCommand(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.span
        ref={ref}
        {...props}
        css={[styles.command, props.css]}
        className={cx("chakra-menu__command", props.className)}
      />
    )
  },
)

MenuCommand.displayName = "MenuCommand"
