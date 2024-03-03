import { SystemRecipeProps, useRecipe } from "../../styled-system"
import {
  TooltipContextProvider,
  TooltipStylesProvider,
} from "./tooltip-context"
import { UseTooltipProps, useTooltip } from "./use-tooltip"

export interface TooltipRootProps
  extends SystemRecipeProps<"Tooltip">,
    Partial<UseTooltipProps> {
  /**
   * The React component to use as the
   * trigger for the tooltip
   */
  children: React.ReactNode
}

/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const TooltipRoot = (props: TooltipRootProps) => {
  const recipe = useRecipe("Tooltip")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  const api = useTooltip(localProps)

  return (
    <TooltipStylesProvider value={styles}>
      <TooltipContextProvider value={api}>
        {props.children}
      </TooltipContextProvider>
    </TooltipStylesProvider>
  )
}

TooltipRoot.displayName = "TooltipRoot"
