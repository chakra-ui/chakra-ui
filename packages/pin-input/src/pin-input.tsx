import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import { cx, __DEV__, getValidChildren } from "@chakra-ui/utils"
import * as React from "react"
import {
  PinInputProvider,
  usePinInput,
  usePinInputField,
  UsePinInputProps,
} from "./use-pin-input"

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
}

export type PinInputProps = UsePinInputProps &
  ThemingProps &
  InputOptions & {
    /**
     * The children of the pin input component
     */
    children: React.ReactNode
  }

export function PinInput(props: PinInputProps) {
  const styles = useStyleConfig("PinInput", props)

  const { children, ...otherProps } = omitThemingProps(props)
  const context = usePinInput(otherProps)

  const clones = getValidChildren(children).map((child) => {
    return React.cloneElement(child, { __css: styles })
  })

  return <PinInputProvider value={context}>{clones}</PinInputProvider>
}

if (__DEV__) {
  PinInput.displayName = "PinInput"
}

export type PinInputFieldProps = PropsOf<typeof chakra.input>

export const PinInputField = React.forwardRef(function PinInputField(
  props: PinInputFieldProps,
  ref: React.Ref<any>,
) {
  const inputProps = usePinInputField({ ref, ...props })
  return (
    <chakra.input
      {...inputProps}
      className={cx("chakra-pin-input", props.className)}
    />
  )
})

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
