import {
  chakra,
  GetProps,
  ThemingProps,
  useStyleConfig,
  forwardRef,
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

export interface PinInputProps
  extends UsePinInputProps,
    ThemingProps,
    InputOptions {
  /**
   * The children of the pin input component
   */
  children: React.ReactNode
}

export const PinInput: React.FC<PinInputProps> = (props) => {
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

export interface PinInputFieldProps extends GetProps<typeof chakra.input> {}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
  function PinInputField(props, ref) {
    const inputProps = usePinInputField({ ref, ...props })
    return (
      <chakra.input
        {...inputProps}
        className={cx("chakra-pin-input", props.className)}
      />
    )
  },
)

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
