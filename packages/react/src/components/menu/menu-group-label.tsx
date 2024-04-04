"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuGroupLabelProps extends HTMLChakraProps<"div"> {}

export const MenuGroupLabel = forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  function MenuGroupLabel(props, ref) {
    const styles = useMenuStyles()
    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-menu__group-label", props.className)}
        css={[styles.groupTitle, props.css]}
      />
    )
  },
)

MenuGroupLabel.displayName = "MenuGroupLabel"
