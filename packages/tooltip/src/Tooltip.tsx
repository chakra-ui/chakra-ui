import * as React from "react"
import { useTooltip, TooltipHookProps } from "./Tooltip.hook"
import { createChakra, chakra, PropsOf } from "@chakra-ui/system"
import { Portal } from "@chakra-ui/portal"
import { isString, omit, pick } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"

const StyledTooltip = createChakra("div", { themeKey: "Tooltip" })

export type TooltipProps = PropsOf<typeof StyledTooltip> &
  TooltipHookProps & {
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
  }

export function Tooltip(props: TooltipProps) {
  const { children, label, shouldWrapChildren, "aria-label": ariaLabel } = props

  const { isOpen, getTriggerProps, getTooltipProps, ...rest } = useTooltip(
    props,
  )

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

  return (
    <React.Fragment>
      {trigger}
      {isOpen && (
        <Portal>
          <StyledTooltip {...tooltipProps}>
            {label}
            {hasAriaLabel && (
              <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
            )}
          </StyledTooltip>
        </Portal>
      )}
    </React.Fragment>
  )
}
