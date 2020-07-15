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
  addDoneStyles?: boolean
  addAppearStyles?: boolean
  transition?: TransitionOptions
  timeout: CSSTransitionProps["timeout"]
  enter: TransitionStateConfig
  exit: TransitionStateConfig
}

export type TransitionStates = "enter" | "exit"

function toCSSTransition(transition: TransitionOptions) {
  return {
    transitionTimingFunction: transition.easing,
    transitionProperty: transition.property,
    transitionDuration: transition.duration,
  }
}

export function transitionConfigToCSS(
  config: TransitionConfig,
  className: string,
): SystemStyleObject {
  const { addDoneStyles, addAppearStyles, enter, exit, transition } = config

  const enterClass = addAppearStyles ? `&-enter, &-appear` : `&-enter`
  const enterDoneClass = addAppearStyles
    ? `&-enter-done, &-appear-done`
    : `&-enter-done`
  const enterActiveClass = addAppearStyles
    ? `&-enter-active, &-appear-active`
    : `&-enter-active`

  const enterTransition = enter.transition ?? transition
  const exitTransition = exit.transition ?? transition

  return {
    [`&.${className}`]: {
      ...(addDoneStyles && enter.from),
      [enterClass]: enter.from,
      [enterActiveClass]: {
        ...enter.to,
        ...(enterTransition && toCSSTransition(enterTransition)),
      },
      ...(addDoneStyles && {
        [enterDoneClass]: enter.to,
      }),
      "&-exit": exit.from,
      "&-exit-active": {
        ...exit.to,
        ...(exitTransition && toCSSTransition(exitTransition)),
      },
      ...(addDoneStyles && { "&-exit-done": exit.to }),
    },
  }
}
