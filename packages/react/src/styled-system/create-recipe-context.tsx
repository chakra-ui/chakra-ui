"use client"

import { forwardRef, useMemo } from "react"
import { createContext } from "../create-context"
import { mergeProps } from "../merge-props"
import { cx } from "../utils"
import { EMPTY_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import { type RecipeKey, type UseRecipeOptions, useRecipe } from "./use-recipe"

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export function createRecipeContext<K extends RecipeKey>(
  options: UseRecipeOptions<K>,
) {
  const { key: recipeKey, recipe: recipeConfig } = options

  const contextName = upperFirst(
    recipeKey || (recipeConfig as any).className || "Component",
  )

  const [PropsProvider, usePropsContext] = createContext<Record<string, any>>({
    strict: false,
    name: `${contextName}PropsContext`,
    providerName: `${contextName}PropsContext`,
  })

  function useRecipeResult(props: any) {
    const { unstyled, ...restProps } = props

    const recipe = useRecipe({
      key: recipeKey,
      recipe: restProps.recipe || recipeConfig,
    })

    // @ts-ignore
    const [variantProps, otherProps] = useMemo(
      () => recipe.splitVariantProps(restProps),
      [recipe, restProps],
    )
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return {
      styles,
      className: recipe.className,
      props: otherProps,
    }
  }

  const withContext = <T, P>(
    Component: React.ElementType<any>,
    options?: JsxFactoryOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component, {}, options as any)
    const StyledComponent = forwardRef<any, any>((inProps, ref) => {
      const propsContext = usePropsContext()
      const props = useMemo(
        () => mergeProps(propsContext, inProps),
        [inProps, propsContext],
      )
      const { styles, className, props: localProps } = useRecipeResult(props)

      return (
        <SuperComponent
          {...localProps}
          ref={ref}
          css={[styles, props.css]}
          className={cx(className, props.className)}
        />
      )
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name
    return StyledComponent as any
  }

  function withPropsProvider<P>(): React.Provider<Partial<P>> {
    return PropsProvider as any
  }

  return {
    withContext,
    PropsProvider,
    withPropsProvider,
    usePropsContext,
    useRecipeResult,
  }
}
