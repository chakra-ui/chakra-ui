import { createChakra, PropsOf } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"
import {
  PinInputHookProps,
  PinInputHookReturn,
  usePinInput,
  usePinInputField,
} from "./Pin-Input.hook"

type ContextType = PinInputHookReturn & {
  isDisabled?: boolean
  isInvalid?: boolean
}

const [ContextProvider, useContext] = createContext<ContextType>({
  strict: true,
  errorMessage:
    "[PinInput]: useContext can only be used within a ContextProvider",
})

export type PinInputProps = PinInputHookProps & {
  children: React.ReactNode
  isDisabled?: boolean
  isInvalid?: boolean
}

export function PinInput(props: PinInputProps) {
  const { children, isDisabled, isInvalid } = props
  const context = { ...usePinInput(props), isDisabled, isInvalid }

  return <ContextProvider value={context}>{children}</ContextProvider>
}

PinInput.displayName = "PinInput"

export type PinInputFieldProps = PropsOf<typeof StyledInput>

interface InputOptions {
  focusBorderColor?: string
  errorBorderColor?: string
}

const StyledInput = createChakra<"input", InputOptions>("input", {
  themeKey: "PinInput",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

StyledInput.defaultProps = {
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}

export function PinInputField(props: PinInputFieldProps) {
  const context = useContext()
  const hookProps = usePinInputField({ context })
  return (
    <StyledInput
      textAlign="center"
      disabled={context.isDisabled}
      aria-invalid={context.isInvalid}
      {...props}
      {...hookProps}
    />
  )
}

PinInputField.displayName = "PinInputField"
