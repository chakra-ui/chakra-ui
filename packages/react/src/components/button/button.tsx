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

/**
 * Props for button loading states
 */
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

/**
 * Base props for the Button component
 */
export interface ButtonBaseProps
  extends RecipeProps<"button">, UnstyledProp, ButtonLoadingProps {}

/**
 * Button component props
 *
 * @example
 * ```tsx
 * <Button variant="solid" colorPalette="blue" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example Loading state
 * ```tsx
 * <Button loading loadingText="Saving...">
 *   Save
 * </Button>
 * ```
 *
 * @see {@link https://chakra-ui.com/docs/components/button Docs}
 */
export interface ButtonProps extends HTMLChakraProps<
  "button",
  ButtonBaseProps
> {}

/**
 * Button component is used to trigger actions or events, such as submitting forms,
 * opening dialogs, canceling actions, or performing delete operations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variants
 * <Button variant="solid">Solid</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 *
 * // With sizes
 * <Button size="xs">Extra Small</Button>
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * // With color palette
 * <Button colorPalette="blue">Blue</Button>
 * <Button colorPalette="red">Red</Button>
 *
 * // Loading state
 * <Button loading>Loading</Button>
 * <Button loading loadingText="Please wait...">
 *   Submit
 * </Button>
 *
 * // Disabled state
 * <Button disabled>Disabled</Button>
 * ```
 *
 * @see {@link https://chakra-ui.com/docs/components/button Docs}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button/ WAI-ARIA Button Pattern}
 */
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
        css={[result.styles, props.css]}
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

Button.displayName = "Button"

export const ButtonPropsProvider =
  PropsProvider as React.Provider<ButtonBaseProps>
