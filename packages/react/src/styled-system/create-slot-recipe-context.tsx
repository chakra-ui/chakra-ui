"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { createContext } from "../create-context"
import type { SystemStyleObject } from "./css.types"
import { EMPTY_SLOT_STYLES } from "./empty"
import { chakra } from "./factory"
import type { JsxFactoryOptions } from "./factory.types"
import type { ConfigRecipeSlots } from "./generated/recipes.gen"
import { type SlotRecipeKey, useSlotRecipe } from "./use-slot-recipe"

interface WrapElementProps<P> {
  wrapElement?(element: React.ReactElement, props: P): React.ReactElement
}

interface WithRootProviderOptions<P> extends WrapElementProps<P> {
  defaultProps?: Partial<P>
}

interface WithProviderOptions<P>
  extends JsxFactoryOptions<P>,
    WrapElementProps<P> {}

interface WithContextOptions<P> extends JsxFactoryOptions<P> {}

const upperFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const createSlotRecipeContext = <R extends SlotRecipeKey>(recipe: R) => {
  const contextName = upperFirst(recipe)

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

  function useRecipeResult(props: any) {
    const { unstyled, ...restProps } = props
    const slotRecipe = useSlotRecipe(recipe, restProps.recipe)

    // @ts-ignore
    const [variantProps, otherProps] = slotRecipe.splitVariantProps(restProps)
    const styles = unstyled ? EMPTY_SLOT_STYLES : slotRecipe(variantProps)

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
    const { defaultProps } = options

    const StyledComponent = (props: any) => {
      const propsWithDefault = { ...defaultProps, ...props }

      const {
        styles,
        classNames,
        props: rootProps,
      } = useRecipeResult(propsWithDefault)

      return (
        <StylesProvider value={styles}>
          <ClassNamesProvider value={classNames}>
            <Component {...rootProps} />
          </ClassNamesProvider>
        </StylesProvider>
      )
    }

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name
    return StyledComponent as any
  }

  const withProvider = <T, P>(
    Component: React.ElementType<any>,
    slot: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: WithProviderOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component, {}, options as any)

    const StyledComponent = forwardRef<any, any>((props, ref) => {
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

      return options?.wrapElement?.(element, props) ?? element
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name

    return StyledComponent as any
  }

  const withContext = <T, P>(
    Component: React.ElementType<any>,
    slot?: R extends keyof ConfigRecipeSlots ? ConfigRecipeSlots[R] : string,
    options?: WithContextOptions<P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  > => {
    const SuperComponent = chakra(Component, {}, options as any)
    const StyledComponent = forwardRef<any, any>((props, ref) => {
      const styles = useStyles()
      const classNames = useClassNames()
      const className = classNames?.[slot as keyof typeof classNames]

      return (
        <SuperComponent
          {...props}
          css={[slot ? styles[slot] : undefined, props.css]}
          ref={ref}
          className={cx(props.className, className)}
        />
      )
    })

    // @ts-expect-error
    StyledComponent.displayName = Component.displayName || Component.name
    return StyledComponent as any
  }

  return {
    StylesProvider,
    ClassNamesProvider,
    useRecipeResult,
    withProvider,
    withContext,
    withRootProvider,
    useStyles,
    useClassNames,
  }
}
