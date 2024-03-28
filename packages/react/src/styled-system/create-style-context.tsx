import { createContext, forwardRef, useContext } from "react"
import { EMPTY_SLOT_STYLES } from "./empty"
import { chakra } from "./factory"
import { ConfigRecipeSlots } from "./generated/recipes.gen"
import { SlotRecipeKey, useSlotRecipe } from "./use-slot-recipe"

export const createStyleContext = <R extends SlotRecipeKey>(recipe: R) => {
  const SlotRecipeContext = createContext<any>(EMPTY_SLOT_STYLES)
  SlotRecipeContext.displayName = `SlotRecipeContext(${recipe})`

  const withProvider = <T, P>(
    Component: React.ElementType<any>,
    slot: R extends keyof ConfigRecipeSlots ? R : string,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component)
    const StyledComponent = forwardRef<any, any>(
      ({ unstyled, ...props }, ref) => {
        const slotRecipe = useSlotRecipe(recipe, props.recipe)
        // @ts-ignore
        const [variantProps, otherProps] = slotRecipe.splitVariantProps(props)
        const slotStyles = unstyled
          ? EMPTY_SLOT_STYLES
          : slotRecipe(variantProps)

        return (
          <SlotRecipeContext.Provider value={slotStyles}>
            <SuperComponent
              ref={ref}
              {...otherProps}
              // @ts-expect-error
              css={[slotStyles[slot], props.css]}
            />
          </SlotRecipeContext.Provider>
        )
      },
    )

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name

    return StyledComponent as any
  }

  const withContext = <T, P>(
    Component: React.ElementType<any>,
    slot: R extends keyof ConfigRecipeSlots ? R : string,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component)
    const StyledComponent = forwardRef<any, any>((props, ref) => {
      const slotStyles = useContext(SlotRecipeContext)
      return (
        <SuperComponent
          {...props}
          css={[slotStyles[slot], props.css]}
          ref={ref}
        />
      )
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name
    return StyledComponent as any
  }

  return { withProvider, withContext }
}
