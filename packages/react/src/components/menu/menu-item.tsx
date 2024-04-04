"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef, useId } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"
import { UseMenuItemProps } from "./use-menu"

export interface StyledMenuItemProps extends HTMLChakraProps<"button"> {}

type DisabledProps = "disabled" | "aria-disabled"

export interface MenuItemProps
  extends Omit<HTMLChakraProps<"button">, DisabledProps>,
    UseMenuItemProps {}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const styles = useMenuStyles()
    const api = useMenuContext()

    const uid = useId()
    const id = props.id ?? `menuitem-${uid}`

    return (
      <chakra.button
        {...api.getItemProps({ ...props, id }, ref)}
        className={cx("chakra-menu__menuitem", props.className)}
        css={[styles.item, props.css]}
      />
    )
  },
)

MenuItem.displayName = "MenuItem"
