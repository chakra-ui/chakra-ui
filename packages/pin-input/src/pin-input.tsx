import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  PinInputContextProvider,
  usePinInput,
  usePinInputContext,
  usePinInputField,
  UsePinInputProps,
} from "./use-pin-input"

export type PinInputProps = UsePinInputProps &
  ThemingProps & {
    /**
     * The children of the pin input component
     */
    children: React.ReactNode
    /**
     * If `true`, the pin input component is put in the disabled state
     */
    isDisabled?: boolean
    /**
     * If `true`, the pin input component is put in the invalid state
     */
    isInvalid?: boolean
  }

export function PinInput(props: PinInputProps) {
  const { children, isDisabled, isInvalid, size, variant, colorScheme } = props
  const context = {
    ...usePinInput(props),
    isDisabled,
    isInvalid,
    size,
    variant,
    colorScheme,
  }

  return (
    <PinInputContextProvider value={context}>
      {children}
    </PinInputContextProvider>
  )
}

if (__DEV__) {
  PinInput.displayName = "PinInput"
}

export type PinInputFieldProps = Omit<PropsOf<typeof StyledInput>, "size"> & {
  size?: string
}

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

const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "PinInput",
  baseStyle: {
    textAlign: "center",
  },
  shouldForwardProp: (prop) =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export const PinInputField = React.forwardRef(function PinInputField(
  props: PinInputFieldProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props

  const { size, variant, colorScheme } = usePinInputContext()
  const ownProps = usePinInputField({ ref, ...rest })

  const theming = { size, variant, colorScheme } as any
  const _className = cx("chakra-pin-input", className)

  return <StyledInput className={_className} {...theming} {...ownProps} />
})

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
