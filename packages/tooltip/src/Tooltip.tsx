import * as React from "react"
import { useTooltip, UseTooltipProps } from "./Tooltip.hook"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Portal } from "@chakra-ui/portal"
import { isString, omit, pick, ariaAttr } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"

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

export function Tooltip(props: TooltipProps) {
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

  let trigger: React.ReactElement

  if (isString(children) || shouldWrapChildren) {
    trigger = (
      <chakra.span tabIndex="0" {...getTriggerProps()}>
        {children}
      </chakra.span>
    )
  } else {
    // ensure tooltip has only one child node
    const child = React.Children.only(children) as React.ReactElement
    trigger = React.cloneElement(child, getTriggerProps(child.props))
  }

  const hasAriaLabel = Boolean(ariaLabel)

  const baseTooltipProps = getTooltipProps(rest)

  const tooltipProps = hasAriaLabel
    ? omit(baseTooltipProps, ["role", "id"])
    : baseTooltipProps

  const hiddenProps = pick(baseTooltipProps, ["role", "id"])

  /**
   * If the `label` or `aria-label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   *
   * @see https://github.com/chakra-ui/chakra-ui/issues/601
   */
  if (!label || !ariaLabel) {
    return children
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
}
