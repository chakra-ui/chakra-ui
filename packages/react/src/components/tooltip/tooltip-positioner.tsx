"use client"

import { cx } from "@chakra-ui/utils"
import { AnimatePresence } from "framer-motion"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra, defineStyle } from "../../styled-system"
import { Portal, PortalProps } from "../portal"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"

export interface TooltipPositionerProps extends HTMLChakraProps<"div"> {
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "containerRef">
}

export const TooltipPositioner = forwardRef<
  HTMLDivElement,
  TooltipPositionerProps
>(function TooltipPositioner(props, ref) {
  const { portalProps, ...restProps } = props

  const styles = useTooltipStyles()
  const api = useTooltipContext()

  const positionerStyles = defineStyle({
    zIndex: styles.zIndex,
    pointerEvents: "none",
  })

  return (
    <AnimatePresence>
      {api.open && (
        <Portal {...portalProps}>
          <chakra.div
            {...api.getPositionerProps(restProps, ref)}
            className={cx("chakra-tooltip__positioner", props.className)}
            css={[positionerStyles, props.css]}
          />
        </Portal>
      )}
    </AnimatePresence>
  )
})

TooltipPositioner.displayName = "TooltipPositioner"
