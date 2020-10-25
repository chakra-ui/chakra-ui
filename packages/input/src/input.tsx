import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
  WithChakraProps,
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

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
  extends Omit<WithChakraProps<"input">, Omitted>,
    InputOptions,
    ThemingProps,
    FormControlOptions {
  size?: string
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps, "input">(function Input(
  props,
  ref,
) {
  const styles = useMultiStyleConfig("Input", props)
  const ownProps = omitThemingProps(props)
  const input = useFormControl<HTMLInputElement>(ownProps)
  const _className = cx("chakra-input", props.className)

  return (
    <chakra.input
      {...input}
      __css={styles.field}
      ref={ref}
      className={_className}
    />
  )
})

if (__DEV__) {
  Input.displayName = "Input"
}

// This is used in `input-group.tsx`
Input.id = "Input"
