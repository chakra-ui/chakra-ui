import {
  forwardRef,
  ChakraComponent,
  PropsOf,
  HTMLChakraProps,
  chakra,
} from "@chakra-ui/system"
import { cx, callAll } from "@chakra-ui/shared-utils"

import { CustomDomComponent, motion, Variants } from "framer-motion"
import { useMenuStyles } from "./menu"
import { useMenuContext, useMenuList, useMenuPositioner } from "./use-menu"

export interface MenuListProps extends HTMLChakraProps<"div"> {
  /**
   * Props for the root element that positions the menu.
   */
  rootProps?: HTMLChakraProps<"div">
}

const motionVariants: Variants = {
  enter: {
    visibility: "visible",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    transitionEnd: {
      visibility: "hidden",
    },
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: "easeOut",
    },
  },
}

function __motion<T extends ChakraComponent<any, any>>(
  el: T,
): CustomDomComponent<PropsOf<T>> {
  const m = motion as any
  if ("custom" in m && typeof m.custom === "function") {
    return m.custom(el)
  }
  return m(el)
}

// @future: only call `motion(chakra.div)` when we drop framer-motion v3 support
const MenuTransition = __motion(chakra.div)

export const MenuList = forwardRef<MenuListProps, "div">((props, ref) => {
  const { rootProps, ...rest } = props
  const {
    isOpen,
    onTransitionEnd,
    unstable__animationState: animated,
  } = useMenuContext()

  const ownProps = useMenuList(rest, ref) as any
  const positionerProps = useMenuPositioner(rootProps)

  const styles = useMenuStyles()

  return (
    <chakra.div
      {...positionerProps}
      __css={{ zIndex: props.zIndex ?? styles.list?.zIndex }}
    >
      <MenuTransition
        {...ownProps}
        /**
         * We could call this on either `onAnimationComplete` or `onUpdate`.
         * It seems the re-focusing works better with the `onUpdate`
         */
        onUpdate={onTransitionEnd}
        onAnimationComplete={callAll(
          animated.onComplete,
          ownProps.onAnimationComplete,
        )}
        className={cx("chakra-menu__menu-list", ownProps.className)}
        variants={motionVariants}
        initial={false}
        animate={isOpen ? "enter" : "exit"}
        __css={{
          outline: 0,
          ...styles.list,
        }}
      />
    </chakra.div>
  )
})

MenuList.displayName = "MenuList"
