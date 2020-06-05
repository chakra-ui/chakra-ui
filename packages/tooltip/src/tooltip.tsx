import { Portal } from "@chakra-ui/portal"
import { chakra, PropsOf } from "@chakra-ui/system"
import { isString, omit, pick, __DEV__ } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"
import { useTooltip, UseTooltipProps } from "./use-tooltip"

const StyledTooltip = chakra("div", { themeKey: "Tooltip" })

export type TooltipProps = PropsOf<typeof StyledTooltip> &
  UseTooltipProps & {
    /**
     * The react component to use as the
     * trigger for the tooltip
     */
    children?: React.ReactNode
    /**
     * The label of the tooltip
     */
    label?: string
    /**
     * The accessible, human friendly label to use for
     * screen readers.
     *
     * If passed, tooltip will show the content `label`
     * but expose only `aria-label` to assistive technologies
     */
    "aria-label"?: string
    /**
     * If `true`, the tooltip will wrap it's children
     * in a `<span/>` with `tabIndex=0`
     */
    shouldWrapChildren?: boolean
    /**
     * If `true`, the tooltip will show an arrow tip
     */
    hasArrow?: boolean
  }

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/components/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */
export const Tooltip = React.forwardRef(
  (props: TooltipProps, ref: React.Ref<any>) => {
    const {
      children,
      label,
      shouldWrapChildren,
      "aria-label": ariaLabel,
      hasArrow,
      ...rest
    } = props

    const {
      isOpen,
      getTriggerProps,
      getTooltipProps,
      getArrowProps,
    } = useTooltip(props)

    const shouldWrap = isString(children) || shouldWrapChildren

    let trigger: React.ReactElement

    if (shouldWrap) {
      trigger = (
        <chakra.span tabIndex={0} {...getTriggerProps()}>
          {children}
        </chakra.span>
      )
    } else {
      // ensure tooltip has only one child node
      const child = React.Children.only(children) as React.ReactElement
      trigger = React.cloneElement(child, getTriggerProps(child.props))
    }

    const hasAriaLabel = !!ariaLabel

    const _tooltipProps = getTooltipProps({ ...rest, ref })

    const tooltipProps = hasAriaLabel
      ? omit(_tooltipProps, ["role", "id"])
      : _tooltipProps

    const hiddenProps = pick(_tooltipProps, ["role", "id"])

    /**
     * If the `label` or `aria-label` is empty, there's no
     * point showing the tooltip. Let's simply return back the children
     *
     * @see https://github.com/chakra-ui/chakra-ui/issues/601
     */
    if (!(label || ariaLabel)) {
      return <React.Fragment>{children}</React.Fragment>
    }

    return (
      <React.Fragment>
        {trigger}
        {isOpen && (
          <Portal>
            <StyledTooltip data-chakra-tooltip="" {...tooltipProps}>
              {label}
              {hasAriaLabel && (
                <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
              )}
              {hasArrow && (
                <chakra.div
                  data-chakra-arrow=""
                  bg="inherit"
                  {...getArrowProps()}
                />
              )}
            </StyledTooltip>
          </Portal>
        )}
      </React.Fragment>
    )
  },
)

if (__DEV__) {
  Tooltip.displayName = "Tooltip"
}
