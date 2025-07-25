"use client"

import { forwardRef, useMemo } from "react"
import { mergeProps } from "../../merge-props"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  createRecipeContext,
} from "../../styled-system"
import { cx, dataAttr } from "../../utils"
import { Loader } from "../loader"

const { useRecipeResult, PropsProvider, usePropsContext } = createRecipeContext(
  { key: "button" },
)

export interface ButtonLoadingProps {
  /**
   * If `true`, the button will show a loading spinner.
   * @default false
   */
  loading?: boolean | undefined
  /**
   * The text to show while loading.
   */
  loadingText?: React.ReactNode | undefined
  /**
   * The spinner to show while loading.
   */
  spinner?: React.ReactNode | undefined
  /**
   * The placement of the spinner
   * @default "start"
   */
  spinnerPlacement?: "start" | "end" | undefined
}

export interface ButtonBaseProps
  extends RecipeProps<"button">,
    UnstyledProp,
    ButtonLoadingProps {
  /**
   * If true, renders a compact button with reduced padding and font size.
   * @default false
   */
  isCompact?: boolean
}

export interface ButtonProps
  extends HTMLChakraProps<"button", ButtonBaseProps> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(inProps, ref) {
    const propsContext = usePropsContext()
    const props = useMemo(
      () => mergeProps(propsContext, inProps),
      [propsContext, inProps],
    )
    const result = useRecipeResult(props)
    const {
      loading,
      loadingText,
      children,
      spinner,
      spinnerPlacement,
      isCompact,
      ...rest
    } = result.props
    return (
      <chakra.button
        type="button"
        ref={ref}
        {...rest}
        data-loading={dataAttr(loading)}
        disabled={loading || rest.disabled}
        className={cx(result.className, props.className)}
        css={[
          result.styles,
          isCompact && {
            paddingInline: "0.5rem",
            paddingBlock: "0.25rem",
            fontSize: "0.875rem",
            height: "auto",
          },
          props.css,
        ]}
      >
        {!props.asChild && loading ? (
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

export const ButtonPropsProvider =
  PropsProvider as React.Provider<ButtonBaseProps>
