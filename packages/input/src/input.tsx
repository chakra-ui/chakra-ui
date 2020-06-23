import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import { chakra, forwardRef, PropsOf } from "@chakra-ui/system"
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
  extends Omit<PropsOf<typeof StyledInput>, Omitted>,
    FormControlOptions {
  size?: string
}

/**
 * Input - Theming
 *
 * To style the input globally, change the styles in
 * `theme.components.Input`
 */

const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "Input",
  shouldForwardProp: (prop) =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
export const Input = forwardRef<InputProps>(function Input(props, ref) {
  console.log(props)
  const inputProps = useFormControl<HTMLInputElement>(props)
  const _className = cx("chakra-input", props.className)

  return <StyledInput ref={ref} {...inputProps} className={_className} />
})

if (__DEV__) {
  Input.displayName = "Input"
}
