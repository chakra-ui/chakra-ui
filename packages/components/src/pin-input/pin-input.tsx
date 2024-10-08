import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx, getValidChildren } from "@chakra-ui/utils"
import { cloneElement } from "react"
import { chakra, forwardRef, HTMLChakraProps, useStyleConfig } from "../system"
import {
  PinInputDescendantsProvider,
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
    ThemingProps<"PinInput">,
    InputOptions {
  /**
   * The children of the pin input component
   */
  children: React.ReactNode
}

/**
 * The `PinInput` component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 *
 * @see Docs https://chakra-ui.com/docs/components/pin-input
 */
export function PinInput(props: PinInputProps) {
  const styles = useStyleConfig("PinInput", props)

  const { children, ...rest } = omitThemingProps(props)
  const { descendants, ...context } = usePinInput(rest)

  const clones = getValidChildren(children).map((child) =>
    cloneElement(child, { __css: styles }),
  )

  return (
    <PinInputDescendantsProvider value={descendants}>
      <PinInputProvider value={context}>{clones}</PinInputProvider>
    </PinInputDescendantsProvider>
  )
}

PinInput.displayName = "PinInput"

export interface PinInputFieldProps extends HTMLChakraProps<"input"> {
  index?: number
}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
  function PinInputField(props, ref) {
    const inputProps = usePinInputField(props, ref)
    return (
      <chakra.input
        {...inputProps}
        className={cx("chakra-pin-input", props.className)}
      />
    )
  },
)

PinInputField.displayName = "PinInputField"
