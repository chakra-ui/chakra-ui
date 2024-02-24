import { getCSSVar } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { popperCSSVars } from "../popper"
import { Portal, PortalProps } from "../portal"
import { HTMLChakraProps, chakra, forwardRef, useTheme } from "../system"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"
import { TooltipPositioner } from "./tooltip-positioner"
import { scale } from "./tooltip-transition"

export interface TooltipContentProps extends HTMLChakraProps<"div"> {
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
  /**
   * The motion props for the tooltip
   */
  motionProps?: HTMLMotionProps<"div">
}

const StyledDiv = chakra(motion.div)

export const TooltipContent = forwardRef<TooltipContentProps, "div">(
  function TooltipContent(props, ref) {
    const styles = useTooltipStyles()
    const api = useTooltipContext()

    const theme = useTheme()

    const {
      children,
      bg,
      portalProps,
      motionProps,
      background,
      backgroundColor,
      bgColor,
      ...ownProps
    } = props

    const userDefinedBg = background ?? backgroundColor ?? bg ?? bgColor

    if (userDefinedBg) {
      styles.bg = userDefinedBg
      const bgVar = getCSSVar(theme, "colors", userDefinedBg)
      ;(styles as any)[popperCSSVars.arrowBg.var] = bgVar
    }

    return (
      <AnimatePresence>
        {api.isOpen && (
          <Portal {...portalProps}>
            <TooltipPositioner>
              <StyledDiv
                ref={ref}
                variants={scale}
                initial="exit"
                animate="enter"
                exit="exit"
                {...motionProps}
                {...(api.getContentProps(ownProps, ref) as any)}
                __css={styles}
                className={cx("chakra-tooltip__content", props.className)}
              >
                {children}
              </StyledDiv>
            </TooltipPositioner>
          </Portal>
        )}
      </AnimatePresence>
    )
  },
)

TooltipContent.displayName = "TooltipContent"
