"use client"

import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  createRecipeContext,
  useRecipe,
} from "../../styled-system"

const { withContext, PropsProvider } = createRecipeContext({
  key: "kbd",
})

export interface KbdBaseProps extends RecipeProps<"kbd">, UnstyledProp {}

export interface KbdProps extends HTMLChakraProps<"kbd", KbdBaseProps> {}

export const Kbd = withContext<HTMLElement, KbdProps>("kbd")

export const KbdPropsProvider = PropsProvider as React.Provider<KbdProps>

////////////////////////////////////////////////////////////////////////////////////

export interface KbdGroupProps extends HTMLChakraProps<
  "kbd",
  RecipeProps<"kbd">
> {}

/**
 * Groups the keys of a shortcut, passing `size` and `variant` to each `Kbd`.
 */
export const KbdGroup = forwardRef<HTMLElement, KbdGroupProps>(
  function KbdGroup(props, ref) {
    const recipe = useRecipe({ key: "kbd" })
    const [variantProps, localProps] = useMemo(
      () => recipe.splitVariantProps(props),
      [props, recipe],
    )
    return (
      <PropsProvider value={variantProps}>
        <chakra.kbd
          ref={ref}
          display="inline-flex"
          alignItems="center"
          gap="1"
          {...localProps}
        />
      </PropsProvider>
    )
  },
)
