"use client"

import { forwardRef, useMemo } from "react"
import { createContext } from "../create-context"
import { mergeProps } from "../merge-props"
import { cx } from "../utils"
import type { SystemStyleObject } from "./css.types"
import {
  getElementTypeDisplayName,
  inferRootProviderDisplayName,
  inferSlotRecipeComponentDisplayName,
  upperFirst,
} from "./display-name"
import { EMPTY_SLOT_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import type { ConfigRecipeSlots } from "./generated/recipes.gen"
import type { SystemSlotRecipeFn } from "./recipe.types"
import {
  type SlotRecipeKey,
  type UseSlotRecipeOptions,
  useSlotRecipe,
} from "./use-slot-recipe"

interface WrapElementProps<P> {
  wrapElement?(element: React.ReactElement, props: P): React.ReactElement
}

export interface WithRootProviderOptions<P> extends WrapElementProps<P> {
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}

export interface WithProviderOptions<P>
  extends JsxFactoryOptions<P>, WrapElementProps<P> {}

export interface WithContextOptions<P> extends JsxFactoryOptions<P> {}

export const createSlotRecipeContext = <R extends SlotRecipeKey>(
  options: UseSlotRecipeOptions<R>,
) => {
  const { key: recipeKey, recipe: recipeConfig } = options

  const contextName = upperFirst(
    recipeKey || (recipeConfig as any).className || "Component",
  )

  const [StylesProvider, useStyles] = createContext<
    Record<string, SystemStyleObject>
  >({
    name: `${contextName}StylesContext`,
    errorMessage: `use${contextName}Styles returned is 'undefined'. Seems you forgot to wrap the components in "<${contextName}.Root />" `,
  })

  const [ClassNamesProvider, useClassNames] = createContext<
    Record<string, string>
  >({
    name: `${contextName}ClassNameContext`,
    errorMessage: `use${contextName}ClassNames returned is 'undefined'. Seems you forgot to wrap the components in "<${contextName}.Root />" `,
    strict: false,
  })

  const [PropsProvider, usePropsContext] = createContext<Record<string, any>>({
    strict: false,
    name: `${contextName}PropsContext`,
    providerName: `${contextName}PropsContext`,
    defaultValue: {},
  })

  function useRecipeResult(props: any) {
    const { unstyled, ...restProps } = props

    const slotRecipe = useSlotRecipe({
      key: recipeKey,
      recipe: restProps.recipe || recipeConfig,
    }) as SystemSlotRecipeFn<string, {}, {}>

    // @ts-ignore
    const [variantProps, otherProps] = useMemo(
      () => slotRecipe.splitVariantProps(restProps),
      [restProps, slotRecipe],
    )
    const styles = useMemo(
      () => (unstyled ? EMPTY_SLOT_STYLES : slotRecipe(variantProps)),
      [unstyled, variantProps, slotRecipe],
    )

    return {
      styles: styles as Record<string, SystemStyleObject>,
      classNames: slotRecipe.classNameMap as Record<string, string>,
      props: otherProps,
    }
  }

  function withRootProvider<P>(
    Component: React.ElementType<any>,
    options: WithRootProviderOptions<P> = {},
  ): React.FC<React.PropsWithoutRef<P>> {
    const { defaultProps, displayName: displayNameOverride } = options

    const innerName = getElementTypeDisplayName(Component)

    const inferredDisplayName = inferRootProviderDisplayName(
      contextName,
      innerName,
    )

    const StyledComponent = (inProps: any) => {
      const propsContext = usePropsContext()
      const props = useMemo(
        () => mergeProps(defaultProps, propsContext, inProps),
        [propsContext, inProps],
      )
      const { styles, classNames, props: rootProps } = useRecipeResult(props)

      return (
        <StylesProvider value={styles}>
          <ClassNamesProvider value={classNames}>
            <Component {...rootProps} />
          </ClassNamesProvider>
        </StylesProvider>
      )
    }

    StyledComponent.displayName =
      displayNameOverride ?? inferredDisplayName ?? innerName
    return StyledComponent as any
  }

  const withProvider = <T, P>(
    Component: React.ElementType<any>,
    slot: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: WithProviderOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const {
      defaultProps,
      displayName: displayNameOverride,
      wrapElement,
      ...restOptions
    } = options ?? {}
    const inferredDisplayName = inferSlotRecipeComponentDisplayName(
      contextName,
      String(slot),
    )
    const SuperComponent = chakra(Component, {}, restOptions as any)

    const StyledComponent = forwardRef<any, any>((inProps, ref) => {
      const propsContext = usePropsContext()
      const props = useMemo(
        () => mergeProps(defaultProps ?? {}, propsContext, inProps),
        [propsContext, inProps],
      )
      const { styles, props: rootProps, classNames } = useRecipeResult(props)
      const className = classNames[slot as keyof typeof classNames]

      const element = (
        <StylesProvider value={styles}>
          <ClassNamesProvider value={classNames}>
            <SuperComponent
              ref={ref}
              {...rootProps}
              css={[styles[slot], props.css]}
              className={cx(props.className, className)}
            />
          </ClassNamesProvider>
        </StylesProvider>
      )

      return wrapElement?.(element, props as P) ?? element
    })

    StyledComponent.displayName =
      displayNameOverride ??
      inferredDisplayName ??
      getElementTypeDisplayName(Component)

    return StyledComponent as any
  }

  const withContext = <T, P>(
    Component: React.ElementType<any>,
    slot?: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: WithContextOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const { displayName: displayNameOverride, ...chakraOptions } = options ?? {}
    const inferredDisplayName =
      slot != null && slot !== ""
        ? inferSlotRecipeComponentDisplayName(contextName, String(slot))
        : contextName
    const SuperComponent = chakra(Component, {}, chakraOptions as any)
    const StyledComponent = forwardRef<any, any>((props, ref) => {
      const { unstyled, ...restProps } = props
      const styles = useStyles()
      const classNames = useClassNames()
      const className = classNames?.[slot as keyof typeof classNames]

      return (
        <SuperComponent
          {...restProps}
          css={[!unstyled && slot ? styles[slot] : undefined, props.css]}
          ref={ref}
          className={cx(props.className, className)}
        />
      )
    })

    StyledComponent.displayName =
      displayNameOverride ??
      inferredDisplayName ??
      getElementTypeDisplayName(Component)
    return StyledComponent as any
  }

  return {
    StylesProvider,
    ClassNamesProvider,
    PropsProvider,
    usePropsContext,
    useRecipeResult,
    withProvider,
    withContext,
    withRootProvider,
    useStyles,
    useClassNames,
  }
}
