"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"
import { popperCSSVars } from "../../popper"
import { HTMLChakraProps, chakra, useChakraContext } from "../../styled-system"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"
import { scale } from "./tooltip-transition"

export interface TooltipContentProps extends HTMLChakraProps<"div"> {
  /**
   * The motion props for the tooltip
   */
  motionProps?: HTMLMotionProps<"div">
}

const StyledDiv = chakra(motion.div)

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(props, ref) {
    const styles = useTooltipStyles()
    const api = useTooltipContext()
    const sys = useChakraContext()

    const {
      bg,
      motionProps,
      background,
      backgroundColor,
      bgColor,
      ...restProps
    } = props

    const _bg = background ?? backgroundColor ?? bg ?? bgColor

    if (_bg) {
      styles.bg = _bg
      const bgVar = sys.token(`colors.${_bg}`, _bg)
      ;(styles as any)[popperCSSVars.arrowBg.var] = bgVar
    }

    return (
      <StyledDiv
        {...api.getContentProps(restProps, ref)}
        variants={scale}
        initial="exit"
        animate="enter"
        exit="exit"
        {...(motionProps as any)}
        className={cx("chakra-tooltip__content", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)

TooltipContent.displayName = "TooltipContent"
