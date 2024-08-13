import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { EMPTY_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import { type RecipeKey, useRecipe } from "./use-recipe"

export function createRecipeContext<T, P>(
  component: React.ElementType<any>,
  recipe: RecipeKey,
  options?: JsxFactoryOptions<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> {
  const StyledComponent = chakra(component, {}, options as any)

  const Component = forwardRef<any, any>((props, ref) => {
    const { unstyled, ...otherProps } = props
    const __recipe = useRecipe(recipe, props.recipe)
    // @ts-ignore
    const [variantProps, localProps] = __recipe.splitVariantProps(otherProps)
    const styles = unstyled ? EMPTY_STYLES : __recipe(variantProps)
    const className = `chakra-${__recipe.className}`

    return (
      <StyledComponent
        {...localProps}
        ref={ref}
        css={[styles, props.css]}
        className={cx(props.className, className)}
      />
    )
  })

  StyledComponent.displayName = Component.displayName || Component.name
  return Component as any
}
