"use client"

import { chakra } from "@chakra-ui/styled-system/jsx"
import { forwardRef, useMemo } from "react"
import { createContext } from "../create-context"
import { mergeProps } from "../merge-props"
import { cx } from "../utils"
import { EMPTY_STYLES } from "./empty"
import type { JsxFactoryOptions } from "./factory.types"
import type { SystemRecipeFn } from "./recipe.types"
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
    }) as SystemRecipeFn<{}, {}>

    const [variantProps, otherProps] = useMemo(
      () => recipe.splitVariantProps(restProps),
      [recipe, restProps],
    )
    const className = useMemo(() => {
      const base = recipe.className ?? (recipe as any).config?.className
      if (unstyled) return base
      const variantMap = (recipe as any).variantMap ?? {}
      const defaults = (recipe as any).config?.defaultVariants ?? {}
      const resolved = { ...defaults, ...variantProps }
      const variantClasses = Object.entries(resolved)
        .filter(([k, v]) => v != null && variantMap[k]?.includes(String(v)))
        .map(([k, v]) => `${base}--${k}_${v}`)
      return cx(base, ...variantClasses)
    }, [recipe, variantProps, unstyled])

    return {
      styles: EMPTY_STYLES,
      className,
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

    StyledComponent.displayName =
      (Component as any).displayName || (Component as any).name
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
