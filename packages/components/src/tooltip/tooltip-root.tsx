import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { useStyleConfig, useTheme } from "../system"
import {
  TooltipContextProvider,
  TooltipStylesProvider,
} from "./tooltip-context"
import { UseTooltipProps, useTooltip } from "./use-tooltip"

export interface TooltipRootProps
  extends ThemingProps<"Tooltip">,
    Partial<UseTooltipProps> {
  /**
   * The React component to use as the
   * trigger for the tooltip
   */
  children: React.ReactNode
  /**
   * The accessible, human friendly label to use for
   * screen readers.
   *
   * If passed, tooltip will show the content `label`
   * but expose only `aria-label` to assistive technologies
   */
  "aria-label"?: string
}

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const TooltipRoot = (props: TooltipRootProps) => {
  const styles = useStyleConfig("Tooltip", props)
  const ownProps = omitThemingProps(props)
  const theme = useTheme()

  const { children, "aria-label": ariaLabel, ...restProps } = ownProps

  const api = useTooltip({
    ...restProps,
    direction: theme.direction,
  })

  return (
    <TooltipStylesProvider value={styles}>
      <TooltipContextProvider value={{ ...api, ariaLabel }}>
        {props.children}
      </TooltipContextProvider>
    </TooltipStylesProvider>
  )
}

TooltipRoot.displayName = "Tooltip"
