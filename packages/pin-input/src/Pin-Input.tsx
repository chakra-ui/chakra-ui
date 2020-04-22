import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  UsePinInputProps,
  UsePinInputReturn,
  usePinInput,
  usePinInputField,
} from "./Pin-Input.hook"

type PinInputContext = UsePinInputReturn &
  ThemingProps & {
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

export type PinInputProps = UsePinInputProps &
  ThemingProps & {
    children: React.ReactNode
    isDisabled?: boolean
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
