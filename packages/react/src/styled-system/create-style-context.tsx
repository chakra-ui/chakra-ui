"use client"

import { forwardRef } from "react"
import { createContext } from "../create-context"
import type { SystemStyleObject } from "./css.types"
import { EMPTY_SLOT_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import type { ConfigRecipeSlots } from "./generated/recipes.gen"
import { type SlotRecipeKey, useSlotRecipe } from "./use-slot-recipe"

export const createStyleContext = <R extends SlotRecipeKey>(recipe: R) => {
  const [RecipeStylesProvider, useStyles] = createContext<
    Record<string, SystemStyleObject>
  >({
    name: `${recipe}StylesContext`,
    errorMessage: `use${recipe}Styles returned is 'undefined'. Seems you forgot to wrap the components in "<${recipe}.Root />" `,
  })

  function withRootProvider<P>(
    Component: React.ElementType<any>,
    options: { defaultProps?: Partial<P> } = {},
  ): React.FC<React.PropsWithoutRef<P>> {
    const { defaultProps } = options
    const StyledComponent = ({ unstyled, ...baseProps }: any) => {
      const props = { ...defaultProps, ...baseProps }
      const slotRecipe = useSlotRecipe(recipe, props.recipe)
      // @ts-ignore
      const [variantProps, otherProps] = slotRecipe.splitVariantProps(props)
      const slotStyles = unstyled ? EMPTY_SLOT_STYLES : slotRecipe(variantProps)

      return (
        <RecipeStylesProvider value={slotStyles}>
          <Component {...otherProps} />
        </RecipeStylesProvider>
      )
    }

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name

    return StyledComponent as any
  }

  const withProvider = <T, P>(
    Component: React.ElementType<any>,
    slot: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: JsxFactoryOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component, {}, options as any)
    const StyledComponent = forwardRef<any, any>(
      ({ unstyled, ...props }, ref) => {
        const slotRecipe = useSlotRecipe(recipe, props.recipe)
        // @ts-ignore
        const [variantProps, otherProps] = slotRecipe.splitVariantProps(props)
        const slotStyles = unstyled
          ? EMPTY_SLOT_STYLES
          : slotRecipe(variantProps)

        return (
          <RecipeStylesProvider value={slotStyles}>
            <SuperComponent
              ref={ref}
              {...otherProps}
              // @ts-expect-error
              css={[slotStyles[slot], props.css]}
            />
          </RecipeStylesProvider>
        )
      },
    )

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name

    return StyledComponent as any
  }

  const withContext = <T, P>(
    Component: React.ElementType<any>,
    slot?: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: JsxFactoryOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component, {}, options as any)
    const StyledComponent = forwardRef<any, any>((props, ref) => {
      const slotStyles = useStyles()
      return (
        <SuperComponent
          {...props}
          css={[slot ? slotStyles[slot] : undefined, props.css]}
          ref={ref}
        />
      )
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name
    return StyledComponent as any
  }

  return { withProvider, withContext, withRootProvider, useStyles }
}
