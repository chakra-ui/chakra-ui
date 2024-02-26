import { getCSSVar } from "@chakra-ui/styled-system"
import { HTMLMotionProps, motion } from "framer-motion"
import { popperCSSVars } from "../popper"
import { HTMLChakraProps, chakra, forwardRef, useTheme } from "../system"
import { useTooltipContext, useTooltipStyles } from "./tooltip-context"
import { scale } from "./tooltip-transition"

export interface TooltipContentProps extends HTMLChakraProps<"div"> {
  /**
   * The motion props for the tooltip
   */
  motionProps?: HTMLMotionProps<"div">
}

export const TooltipContent = forwardRef<TooltipContentProps, "div">(
  function TooltipContent(props, ref) {
    const styles = useTooltipStyles()
    const api = useTooltipContext()

    const theme = useTheme()

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
      const bgVar = getCSSVar(theme, "colors", _bg)
      ;(styles as any)[popperCSSVars.arrowBg.var] = bgVar
    }

    return (
      <chakra.div
        asChild
        __css={styles}
        {...api.getContentProps(restProps, ref)}
      >
        <motion.div
          variants={scale}
          initial="exit"
          animate="enter"
          exit="exit"
          {...motionProps}
        >
          {props.children}
        </motion.div>
      </chakra.div>
    )
  },
)

TooltipContent.displayName = "TooltipContent"
