import {
  chakra,
  PropsOf,
  ThemingProps,
  useStyleConfig,
  omitThemingProps,
  useStyles,
  StylesProvider,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  PinInputContextProvider,
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
  const { children } = omitThemingProps(props)
  const context = usePinInput(props)

  return (
    <PinInputContextProvider value={context}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </PinInputContextProvider>
  )
}

if (__DEV__) {
  PinInput.displayName = "PinInput"
}

export type PinInputFieldProps = PropsOf<typeof chakra.input>

export const PinInputField = React.forwardRef(function PinInputField(
  props: PinInputFieldProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props

  const input = usePinInputField({ ref, ...rest })
  const _className = cx("chakra-pin-input", className)
  const styles = useStyles()

  return (
    <chakra.input
      className={_className}
      {...input}
      __css={{
        textAlign: "center",
        ...styles.input,
      }}
    />
  )
})

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
