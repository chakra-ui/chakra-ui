/** @jsx jsx */
import * as React from "react"
import AnimateHeight, {
  AnimateHeightProps as AnimateProps,
} from "react-animate-height"
import { chakra, jsx, PropsOf, forwardRef } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

type AnimateHeightProps = Pick<
  AnimateProps,
  | "animationStateClasses"
  | "applyInlineTransitions"
  | "delay"
  | "easing"
  | "style"
  | "children"
>

export interface CollapseOptions {
  /**
   * If `true`, the content will be visible
   */
  isOpen?: boolean
  /**
   * If `true`, the opacity of the content will be animated
   */
  animateOpacity?: boolean
  /**
   * The duration of the animation in `ms`
   */
  duration?: number
  /**
   * The height you want the content in it's collapsed state. Set to `0` by default
   */
  startingHeight?: number | string
  /**
   * The height you want the content in it's expanded state. Set to `auto` by default
   */
  endingHeight?: number | string
  /**
   * The function to be called when the collapse animation starts. It provides the `newHeight` as an argument
   */
  onAnimationEnd?(props: { newHeight: number }): void
  /**
   * The function to be called when the collapse animation ends. It provides the `newHeight` as an argument
   */
  onAnimationStart?(props: { newHeight: number }): void
}

export type ICollapse = CollapseProps

export type CollapseProps = AnimateHeightProps &
  CollapseOptions &
  PropsOf<typeof chakra.div>

export const Collapse: React.FC<CollapseProps> = forwardRef((props, ref) => {
  const {
    isOpen,
    animateOpacity = true,
    onAnimationStart,
    onAnimationEnd,
    duration,
    easing = "ease",
    startingHeight = 0,
    endingHeight = "auto",
    ...rest
  } = props

  return (
    <AnimateHeight
      duration={duration}
      easing={easing}
      animateOpacity={animateOpacity}
      height={isOpen ? endingHeight : startingHeight}
      applyInlineTransitions={false}
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
      sx={{
        transition:
          "height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out",
        "&.rah-animating--to-height-zero": {
          opacity: 0,
          transform: "translateY(-0.625rem)",
        },
      }}
    >
      <chakra.div ref={ref} {...rest} />
    </AnimateHeight>
  )
})

if (__DEV__) {
  Collapse.displayName = "Collapse"
}

export default Collapse
