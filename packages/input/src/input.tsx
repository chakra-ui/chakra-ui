import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  PropsOf,
  useComponentStyle,
  forwardRef,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { useInputGroup } from "./input-group"

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
  const inputProps = useFormControl<HTMLInputElement>(props)
  const group = useInputGroup()

  const variant = props.variant ?? group?.variant
  const size = props.size ?? group?.size

  const theming = { variant, size } as any

  const inputStyle = useComponentStyle({
    themeKey: "Input",
    variant,
    size,
  })

  const groupProps = {} as InputProps

  if (group?.leftElement?.isMounted) {
    groupProps.paddingLeft = inputStyle?.minHeight
  }

  if (group?.rightElement?.isMounted) {
    groupProps.paddingRight = inputStyle?.minHeight
  }

  if (group?.leftAddon?.isMounted) {
    groupProps.borderLeftRadius = 0
  }

  if (group?.rightAddon?.isMounted) {
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
})

if (__DEV__) {
  Input.displayName = "Input"
}
