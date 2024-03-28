"use client"

import { callAll, cx } from "@chakra-ui/utils"
import { HTMLMotionProps, Variants, motion } from "framer-motion"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useRenderStrategyContext } from "../render-strategy"
import {
  useAnimationStateContext,
  useMenuContext,
  useMenuStyles,
} from "./menu-context"

export interface MenuContentProps extends HTMLChakraProps<"div"> {
  /**
   * The framer-motion props to animate the menu list
   */
  motionProps?: HTMLMotionProps<"div">
}

const motionVariants: Variants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  },
  exit: {
    transitionEnd: {
      visibility: "hidden",
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.05,
      easings: "easeIn",
    },
  },
}

const StyledDiv = chakra(motion.div)

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { motionProps = {}, ...restProps } = props

    const api = useMenuContext()
    const styles = useMenuStyles()
    const render = useRenderStrategyContext()

    const animationState = useAnimationStateContext()

    return (
      <StyledDiv
        variants={motionVariants}
        initial={false}
        animate={api.open ? "enter" : "exit"}
        {...(motionProps as any)}
        {...api.getContentProps(restProps, ref)}
        css={[styles.content, props.css]}
        className={cx("chakra-menu__content", props.className)}
        onAnimationComplete={callAll(
          motionProps.onAnimationComplete,
          animationState.onComplete,
        )}
      >
        {render.unmounted ? null : props.children}
      </StyledDiv>
    )
  },
)

MenuContent.displayName = "MenuContent"
