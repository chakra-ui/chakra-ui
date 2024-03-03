import { cx } from "@chakra-ui/utils"
import { callAll } from "@chakra-ui/utils"
import { HTMLMotionProps, Variants, motion } from "framer-motion"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuContext, useMenuStyles } from "./menu-context"
import { useMenuContent } from "./use-menu"

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

const StyledDiv = chakra(motion.div)

export const MenuContent = forwardRef<MenuContentProps, "div">(
  function MenuContent(props, ref) {
    const { motionProps, ...restProps } = props

    const api = useMenuContext()
    const styles = useMenuStyles()

    const contentProps = useMenuContent(restProps, ref) as any

    return (
      <StyledDiv
        variants={motionVariants}
        initial={false}
        animate={api.isOpen ? "enter" : "exit"}
        css={styles.content}
        {...motionProps}
        {...contentProps}
        className={cx("chakra-menu__menu-list", props.className)}
        onUpdate={api.onTransitionEnd}
        onAnimationComplete={callAll(
          api.unstable__animationState.onComplete,
          contentProps.onAnimationComplete,
        )}
      />
    )
  },
)

MenuContent.displayName = "MenuContent"
