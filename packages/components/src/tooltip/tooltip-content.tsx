import { getCSSVar } from "@chakra-ui/styled-system"
import { omit } from "@chakra-ui/utils/omit"
import { pick } from "@chakra-ui/utils/pick"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { popperCSSVars } from "../popper"
import { Portal, PortalProps } from "../portal"
import { HTMLChakraProps, chakra, forwardRef, useTheme } from "../system"
import { scale } from "./tooltip.transition"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"

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

const MotionDiv = chakra(motion.div)

export const TooltipContent = forwardRef<TooltipContentProps, "div">(
  function TooltipContent(props, ref) {
    const styles = useTooltipStyles()

    const { ariaLabel, isOpen, getTooltipPositionerProps } = useTooltipContext()

    const theme = useTheme()

    const {
      children,
      bg,
      portalProps,
      motionProps,
      background,
      backgroundColor,
      bgColor,
      ...restProps
    } = props

    const userDefinedBg = background ?? backgroundColor ?? bg ?? bgColor

    if (userDefinedBg) {
      styles.bg = userDefinedBg
      const bgVar = getCSSVar(theme, "colors", userDefinedBg)
      ;(styles as any)[popperCSSVars.arrowBg.var] = bgVar
    }

    const hasAriaLabel = !!ariaLabel

    const tooltipProps = hasAriaLabel
      ? omit(restProps, ["role", "id"])
      : restProps

    const srOnlyProps = pick(restProps, ["role", "id"])

    return (
      <AnimatePresence>
        {isOpen && (
          <Portal {...portalProps}>
            <chakra.div
              {...getTooltipPositionerProps()}
              __css={{
                zIndex: styles.zIndex,
                pointerEvents: "none",
              }}
            >
              <MotionDiv
                ref={ref}
                variants={scale}
                initial="exit"
                animate="enter"
                exit="exit"
                {...motionProps}
                {...(tooltipProps as any)}
                __css={styles}
              >
                {children}
                {hasAriaLabel && (
                  <chakra.span srOnly {...srOnlyProps}>
                    {ariaLabel}
                  </chakra.span>
                )}
              </MotionDiv>
            </chakra.div>
          </Portal>
        )}
      </AnimatePresence>
    )
  },
)

TooltipContent.displayName = "TooltipContent"
