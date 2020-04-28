import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  UsePinInputProps,
  UsePinInputReturn,
  usePinInput,
  usePinInputField,
} from "./Pin-Input.hook"

export type PinInputContext = UsePinInputReturn &
  ThemingProps & {
    /**
     * Sets the pin input component to the disabled state
     */
    isDisabled?: boolean
    /**
     * Sets the pin input component to the invalid state
     */
    isInvalid?: boolean
  }

const [PinInputCtxProvider, usePinInputContext] = createContext<
  PinInputContext
>({
  strict: true,
  errorMessage:
    "[Chakra UI]: usePinInputContext can only be used within a PinInputCtxProvider",
})

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

  return <PinInputCtxProvider value={context}>{children}</PinInputCtxProvider>
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
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export function PinInputField(props: PinInputFieldProps) {
  const context = usePinInputContext()
  const hookProps = usePinInputField({ context })
  const { size, variant, colorScheme } = context
  const themingProps = { size, variant, colorScheme } as any
  return (
    <StyledInput
      textAlign="center"
      disabled={context.isDisabled}
      aria-invalid={context.isInvalid}
      {...themingProps}
      {...props}
      {...hookProps}
    />
  )
}

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
