import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__, ariaAttr, cx } from "@chakra-ui/utils"
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
  name: "PinInputContext",
  errorMessage:
    "Chakra UI: PinInputField can only be used within PinInput component",
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

export const PinInputField = React.forwardRef(
  (props: PinInputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const { className, ...rest } = props
    const context = usePinInputContext()
    const ownProps = usePinInputField({ context, ref, ...rest })

    const { size, variant, colorScheme } = context
    const theming = { size, variant, colorScheme } as any

    const _className = cx("chakra-pin-input", className)

    return (
      <StyledInput
        ref={ref}
        textAlign="center"
        disabled={context.isDisabled}
        aria-invalid={ariaAttr(context.isInvalid)}
        className={_className}
        {...theming}
        {...ownProps}
      />
    )
  },
)

if (__DEV__) {
  PinInputField.displayName = "PinInputField"
}
