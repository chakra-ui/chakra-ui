import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { isString, omit, pick, __DEV__ } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"
import { useTooltip, UseTooltipProps } from "./use-tooltip"

export interface TooltipProps
  extends PropsOf<typeof chakra.div>,
    ThemingProps,
    UseTooltipProps {
  /**
   * The react component to use as the
   * trigger for the tooltip
   */
  children: React.ReactNode
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
export const Tooltip = forwardRef<TooltipProps, "div">(function Tooltip(
  props,
  ref,
) {
  const styles = useStyleConfig("Tooltip", props)
  const ownProps = omitThemingProps(props)

  const {
    children,
    label,
    shouldWrapChildren,
    "aria-label": ariaLabel,
    hasArrow,
    bg,
    ...rest
  } = ownProps

  if (bg) {
    //@ts-expect-error
    styles.bg = bg
  }

  const tooltip = useTooltip(rest)

  const shouldWrap = isString(children) || shouldWrapChildren

  let trigger: React.ReactElement

  if (shouldWrap) {
    trigger = (
      <chakra.span tabIndex={0} {...tooltip.getTriggerProps()}>
        {children}
      </chakra.span>
    )
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    const child = React.Children.only(children) as React.ReactElement & {
      ref?: React.Ref<any>
    }
    trigger = React.cloneElement(
      child,
      tooltip.getTriggerProps(child.props, child.ref),
    )
  }

  const hasAriaLabel = !!ariaLabel

  const _tooltipProps = tooltip.getTooltipProps({}, ref)

  const tooltipProps = hasAriaLabel
    ? omit(_tooltipProps, ["role", "id"])
    : _tooltipProps

  const hiddenProps = pick(_tooltipProps, ["role", "id"])

  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */
  if (!label) {
    return <>{children}</>
  }

  return (
    <>
      {trigger}
      {tooltip.isOpen && (
        <Portal>
          <chakra.div {...tooltipProps} __css={styles}>
            {label}
            {hasAriaLabel && (
              <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
            )}
            {hasArrow && (
              <chakra.div
                className="chakra-tooltip__arrow-wrapper"
                {...tooltip.getArrowWrapperProps()}
              >
                <chakra.div
                  className="chakra-toolip__arrow"
                  {...tooltip.getArrowProps()}
                  __css={{ color: styles.bg }}
                ></chakra.div>
              </chakra.div>
            )}
          </chakra.div>
        </Portal>
      )}
    </>
  )
})

if (__DEV__) {
  Tooltip.displayName = "Tooltip"
}
