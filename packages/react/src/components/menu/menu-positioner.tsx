"use client"

import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"

export interface MenuPositionerProps extends HTMLChakraProps<"div"> {}

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>(
  function MenuPositioner(props, ref) {
    const api = useMenuContext()
    const styles = useMenuStyles()

    return (
      <chakra.div
        {...api.getPositionerProps(props, ref)}
        css={[{ zIndex: props.zIndex ?? styles.content?.zIndex }, props.css]}
      />
    )
  },
)

MenuPositioner.displayName = "MenuPositioner"
