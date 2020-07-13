import { SystemStyleObject } from "@chakra-ui/system"
import { CSSTransitionProps } from "react-transition-group/CSSTransition"

export interface TransitionOptions {
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

export interface TransitionStateConfig {
  transition?: TransitionOptions
  from: SystemStyleObject
  to: SystemStyleObject
}

export interface TransitionConfig {
  transition?: TransitionOptions
  timeout: CSSTransitionProps["timeout"]
  enter: TransitionStateConfig
  exit: TransitionStateConfig
}

export type TransitionStates = "enter" | "exit" | "appear"

function getTransitionStyles(config: TransitionConfig, type: TransitionStates) {
  const motion = config[type] ?? config.enter

  if (!motion) return {}

  const _transition = motion.transition ?? config.transition ?? {}
  const transition = _transition as TransitionOptions

  return {
    ...(type === "enter" && motion.from),
    [`&-${type}`]: motion.from,
    [`&-${type}-active`]: {
      ...motion.to,
      transitionTimingFunction: transition.easing,
      transitionProperty: transition.property,
      transitionDuration: transition.duration,
    },
    [`&-${type}-done`]: motion.to,
  }
}

export function transitionConfigToCSS(
  config: TransitionConfig,
  className: string,
): SystemStyleObject {
  return {
    [`&.${className}`]: {
      ...getTransitionStyles(config, "enter"),
      ...getTransitionStyles(config, "exit"),
      ...getTransitionStyles(config, "appear"),
    },
  }
}
