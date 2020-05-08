import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { useInputGroup } from "./Input.group"

type OmittedTypes = "disabled" | "required" | "readOnly" | "size"

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

export interface InputProps
  extends Omit<PropsOf<typeof StyledInput>, OmittedTypes>,
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
    const size = group?.size || props.size

    const theming = { variant, size } as any

    const groupProps = {} as InputProps

    if (group?.leftElement?.hasMeasured) {
      groupProps.paddingLeft = group?.leftElement.rect?.width
    }

    if (group?.rightElement?.hasMeasured) {
      groupProps.paddingRight = group?.rightElement.rect?.width
    }

    if (group?.leftAddon?.mounted) {
      groupProps.borderLeftRadius = 0
    }

    if (group?.rightAddon?.mounted) {
      groupProps.borderRightRadius = 0
    }

    const _className = cx("chakra-input", props.className)

    return (
      <StyledInput
        ref={ref}
        {...groupProps}
        {...inputProps}
        {...theming}
        className={_className}
      />
    )
  },
)

if (__DEV__) {
  Input.displayName = "Input"
}
