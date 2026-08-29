"use client"

import { createRecipeContext } from "@chakra-ui/styled-system/jsx"
import { button } from "@chakra-ui/styled-system/recipes/button"
import { forwardRef, useMemo } from "react"
import { mergeProps } from "../../merge-props"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
} from "../../styled-system"
import { cx, dataAttr } from "../../utils"
import { Loader } from "../loader"

const { PropsProvider, usePropsContext } = createRecipeContext(button)

export interface ButtonLoadingProps {
  loading?: boolean | undefined
  loadingText?: React.ReactNode | undefined
  spinner?: React.ReactNode | undefined
  spinnerPlacement?: "start" | "end" | undefined
}

export interface ButtonBaseProps
  extends RecipeProps<"button">, UnstyledProp, ButtonLoadingProps {}

export interface ButtonProps extends HTMLChakraProps<
  "button",
  ButtonBaseProps
> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(inProps, ref) {
    const propsContext = usePropsContext()
    const props = useMemo(
      () => mergeProps(propsContext ?? {}, inProps),
      [propsContext, inProps],
    )

    const [variantProps, ownProps] = button.splitVariantProps(props as any)
    const {
      loading,
      loadingText,
      children,
      spinner,
      spinnerPlacement,
      css: cssProp,
      className,
      ...elementProps
    } = ownProps as Record<string, any>

    return (
      <chakra.button
        type="button"
        ref={ref}
        {...elementProps}
        data-loading={dataAttr(loading)}
        disabled={loading || elementProps.disabled}
        className={cx(button(variantProps), className)}
        css={cssProp}
      >
        {!(props as any).asChild && loading ? (
          <Loader
            spinner={spinner}
            text={loadingText}
            spinnerPlacement={spinnerPlacement}
          >
            {children}
          </Loader>
        ) : (
          children
        )}
      </chakra.button>
    )
  },
)

Button.displayName = "Button"

export const ButtonPropsProvider =
  PropsProvider as React.Provider<ButtonBaseProps>
