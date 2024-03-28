"use client"

import {
  EMPTY_SLOT_STYLES,
  SlotRecipeProps,
  UnstyledProp,
  useRecipe,
} from "../../styled-system"
import {
  TooltipContextProvider,
  TooltipStylesProvider,
} from "./tooltip-context"
import { UseTooltipProps, useTooltip } from "./use-tooltip"

export interface TooltipRootProps
  extends SlotRecipeProps<"Tooltip">,
    UnstyledProp,
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
export function TooltipRoot({ unstyled, ...props }: TooltipRootProps) {
  const recipe = useRecipe("Tooltip", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

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
