import { SystemStyleObject } from "@chakra-ui/system"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"

export interface MotionTransition {
  /**
   * The CSS `transition-timing-function` to apply
   */
  easing: string
  /**
   * The CSS `transition-duration` to apply
   */
  duration: string
  /**
   * The CSS `transition-property` to apply
   */
  property: string
}

export interface MotionTypeConfig {
  transition: MotionTransition
  from: SystemStyleObject
  to: SystemStyleObject
}

export interface MotionConfig {
  timeout: CSSTransitionProps["timeout"]
  enter: MotionTypeConfig
  exit: MotionTypeConfig
}

export type MotionType = "enter" | "exit"

function getMotionStyles(config: MotionConfig, type: MotionType) {
  const motion = config[type]
  return {
    ...(type === "enter" && motion.from),
    [`&-${type}`]: motion.from,
    [`&-${type}-active`]: {
      ...motion.to,
      transitionTimingFunction: motion.transition.easing,
      transitionProperty: motion.transition.property,
      transitionDuration: motion.transition.duration,
    },
    [`&-${type}-done`]: motion.to,
  }
}

function motionConfigToCSS(
  config: MotionConfig,
  className: string,
): SystemStyleObject {
  return {
    [`&.${className}`]: {
      ...getMotionStyles(config, "enter"),
      ...getMotionStyles(config, "exit"),
    },
  }
}

export default motionConfigToCSS
