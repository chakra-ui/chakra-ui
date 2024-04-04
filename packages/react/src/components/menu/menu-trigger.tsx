"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"

export interface MenuTriggerProps extends HTMLChakraProps<"button"> {}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  function MenuTrigger(props, ref) {
    const api = useMenuContext()
    const styles = useMenuStyles()

    return (
      <chakra.button
        {...api.getTriggerProps(props, ref)}
        className={cx("chakra-menu__trigger", props.className)}
        css={[styles.trigger, props.css]}
      />
    )
  },
)

MenuTrigger.displayName = "MenuTrigger"
