import { chakra, PropsOf } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  UsePinInputProps,
  UsePinInputReturn,
  usePinInput,
  usePinInputField,
} from "./Pin-Input.hook"

type PinInputContext = UsePinInputReturn & {
  isDisabled?: boolean
  isInvalid?: boolean
}

const [PinInputCtxProvider, usePinInputContext] = createContext<
  PinInputContext
>({
  strict: true,
  errorMessage:
    "[Chakra UI]: usePinInputContext can only be used within a PinInputCtxProvider",
})

export type PinInputProps = UsePinInputProps & {
  children: React.ReactNode
  isDisabled?: boolean
  isInvalid?: boolean
}

export function PinInput(props: PinInputProps) {
  const { children, isDisabled, isInvalid } = props
  const context = { ...usePinInput(props), isDisabled, isInvalid }

  return <PinInputCtxProvider value={context}>{children}</PinInputCtxProvider>
}

if (__DEV__) {
  PinInput.displayName = "PinInput"
}

export type PinInputFieldProps = PropsOf<typeof StyledInput>

interface InputOptions {
  focusBorderColor?: string
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

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
