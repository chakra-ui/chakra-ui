"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { EMPTY_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import type { RecipeDefinition } from "./recipe.types"
import { type RecipeKey, useRecipe } from "./use-recipe"

export function createRecipeContext<T, P>(
  component: React.ElementType<any>,
  recipeKeyOrConfig: RecipeKey | RecipeDefinition,
  options?: JsxFactoryOptions<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> {
  const recipeKey =
    typeof recipeKeyOrConfig === "string" ? recipeKeyOrConfig : undefined
  const recipeConfig =
    typeof recipeKeyOrConfig === "string" ? undefined : recipeKeyOrConfig

  const StyledComponent = chakra(component, {}, options as any)

  const Component = forwardRef<any, any>((props, ref) => {
    const { unstyled, ...otherProps } = props

    const fallbackRecipe = props.recipe || recipeConfig
    const recipe = useRecipe({ key: recipeKey, recipe: fallbackRecipe })

    // @ts-ignore
    const [variantProps, localProps] = recipe.splitVariantProps(otherProps)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return (
      <StyledComponent
        {...localProps}
        ref={ref}
        css={[styles, props.css]}
        className={cx(recipe.className, props.className)}
      />
    )
  })

  StyledComponent.displayName = Component.displayName || Component.name
  return Component as any
}
