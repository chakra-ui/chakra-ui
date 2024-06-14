"use client"

import {
  RecipePropsProvider,
  type SlotRecipeProps,
  useSlotRecipe,
} from "../../styled-system"
import { CheckboxGroupProvider } from "./checkbox-context"
import type { UseCheckboxGroupProps } from "./checkbox-types"
import { useCheckboxGroup } from "./use-checkbox-group"

export interface CheckboxGroupProps
  extends UseCheckboxGroupProps,
    SlotRecipeProps<"checkbox"> {
  children?: React.ReactNode
}

/**
 * Used for multiple checkboxes which are bound in one group,
 * and it indicates whether one or more options are selected.
 *
 * @see Docs https://chakra-ui.com/checkbox
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const recipe = useSlotRecipe("Checkbox", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)

  const { children, ...hookProps } = localProps
  const groupApi = useCheckboxGroup(hookProps)

  return (
    <CheckboxGroupProvider value={groupApi}>
      <RecipePropsProvider value={variantProps}>{children}</RecipePropsProvider>
    </CheckboxGroupProvider>
  )
}

CheckboxGroup.displayName = "CheckboxGroup"
