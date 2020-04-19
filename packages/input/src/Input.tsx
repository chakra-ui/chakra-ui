import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import { chakra, PropsOf, useComponentStyle } from "@chakra-ui/system"
import * as React from "react"
import { useInputGroup } from "./Input.group"
import { __DEV__ } from "@chakra-ui/utils"

type OmittedTypes = "disabled" | "required" | "readOnly"

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

export type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> &
  FormControlOptions

const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "Input",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */

export const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useFormControl<HTMLInputElement>(props)
    const group = useInputGroup()

    const variant = group?.variant || props.variant
    const size = (group?.size || props.size) as any

    const inputStyle = useComponentStyle({
      themeKey: "Input",
      variant,
      size,
    })

    const themingProps = { variant, size } as any

    return (
      <StyledInput
        ref={ref}
        {...inputProps}
        {...themingProps}
        {...(group?.hasRightElement && { paddingRight: inputStyle?.height })}
        {...(group?.hasLeftElement && { paddingLeft: inputStyle?.height })}
      />
    )
  },
)

if (__DEV__) {
  Input.displayName = "Input"
}
