import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean
}

export type InputProps = Omit<
  PropsOf<typeof chakra.input>,
  "disabled" | "required" | "readOnly" | "size"
> &
  ThemingProps &
  FormControlOptions & {
    size?: string
  }

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps>(function Input(props, ref) {
  const styles = useStyleConfig("Input", props)
  const realProps = omitThemingProps(props)
  const inputProps = useFormControl<HTMLInputElement>(realProps)
  const _className = cx("chakra-input", props.className)

  return (
    <chakra.input
      {...inputProps}
      __css={styles.Container}
      ref={ref}
      className={_className}
    />
  )
})

if (__DEV__) {
  Input.displayName = "Input"
}

//@ts-ignore
Input.__hidden = "Input"
