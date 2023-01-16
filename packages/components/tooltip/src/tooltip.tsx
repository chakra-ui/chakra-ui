import { popperCSSVars } from "@chakra-ui/popper"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  useTheme,
  getCSSVar,
} from "@chakra-ui/system"
import { omit, pick } from "@chakra-ui/object-utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { Children, cloneElement } from "react"
import { scale } from "./tooltip.transition"
import { useTooltip, UseTooltipProps } from "./use-tooltip"

export interface TooltipProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Tooltip">,
    UseTooltipProps {
  /**
   * The React component to use as the
   * trigger for the tooltip
   */
  children: React.ReactNode
  /**
   * The label of the tooltip
   */
  label?: React.ReactNode
  /**
   * The accessible, human friendly label to use for
   * screen readers.
   *
   * If passed, tooltip will show the content `label`
   * but expose only `aria-label` to assistive technologies
   */
  "aria-label"?: string
  /**
   * If `true`, the tooltip will wrap its children
   * in a `<span/>` with `tabIndex=0`
   * @default false
   */
  shouldWrapChildren?: boolean
  /**
   * If `true`, the tooltip will show an arrow tip
   * @default false
   */
  hasArrow?: boolean
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, "appendToParentPortal" | "containerRef">
  motionProps?: HTMLMotionProps<"div">
}

const MotionDiv = chakra(motion.div)

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const Tooltip = forwardRef<TooltipProps, "div">((props, ref) => {
  const styles = useStyleConfig("Tooltip", props)
  const ownProps = omitThemingProps(props)
  const theme = useTheme()

  const {
    children,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    bg,
    portalProps,
    background,
    backgroundColor,
    bgColor,
    motionProps,
    ...rest
  } = ownProps

  const userDefinedBg = background ?? backgroundColor ?? bg ?? bgColor

  if (userDefinedBg) {
    styles.bg = userDefinedBg
    const bgVar = getCSSVar(theme, "colors", userDefinedBg)
    ;(styles as any)[popperCSSVars.arrowBg.var] = bgVar
  }
  const tooltip = useTooltip({ ...rest, direction: theme.direction })

  const shouldWrap = typeof children === "string" || shouldWrapChildren

  let trigger: React.ReactElement

  if (shouldWrap) {
    trigger = (
      <chakra.span
        display="inline-block"
        tabIndex={0}
        {...tooltip.getTriggerProps()}
      >
        {children}
      </chakra.span>
    )
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    const child = Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>
    }
    trigger = cloneElement(
      child,
      tooltip.getTriggerProps(child.props, child.ref),
    )
  }

  const hasAriaLabel = !!ariaLabel

  const _tooltipProps = tooltip.getTooltipProps({}, ref)

  const tooltipProps = hasAriaLabel
    ? omit(_tooltipProps, ["role", "id"])
    : _tooltipProps

  const srOnlyProps = pick(_tooltipProps, ["role", "id"])

  /**
   * If the `label` is empty, there's no point showing the tooltip.
   * Let's simply return the children
   */
  if (!label) {
    return <>{children}</>
  }

  return (
    <>
      {trigger}
      <AnimatePresence>
        {tooltip.isOpen && (
          <Portal {...portalProps}>
            <chakra.div
              {...tooltip.getTooltipPositionerProps()}
              __css={{
                zIndex: styles.zIndex,
                pointerEvents: "none",
              }}
            >
              <MotionDiv
                variants={scale}
                initial="exit"
                animate="enter"
                exit="exit"
                {...motionProps}
                {...(tooltipProps as any)}
                __css={styles}
              >
                {label}
                {hasAriaLabel && (
                  <chakra.span srOnly {...srOnlyProps}>
                    {ariaLabel}
                  </chakra.span>
                )}
                {hasArrow && (
                  <chakra.div
                    data-popper-arrow
                    className="chakra-tooltip__arrow-wrapper"
                  >
                    <chakra.div
                      data-popper-arrow-inner
                      className="chakra-tooltip__arrow"
                      __css={{ bg: styles.bg }}
                    />
                  </chakra.div>
                )}
              </MotionDiv>
            </chakra.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
})

Tooltip.displayName = "Tooltip"
