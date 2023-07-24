import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
  SystemProps,
} from "../system"
import { cx } from "@chakra-ui/utils"
import { getValidChildren } from "../shared/children"
import {
  PinInputProvider,
  usePinInput,
  usePinInputField,
  UsePinInputProps,
} from "./use-pin-input"
import { cloneElement } from "react"
import { useMergeRefs } from "@chakra-ui/hooks"

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
    Omit<HTMLChakraProps<"div">, keyof UsePinInputProps>,
    ThemingProps<"PinInput">,
    InputOptions {
  /**
   * The children of the pin input component
   */
  children: React.ReactNode
  /**
   * Spacing between each of the input fields
   * @type SystemProps["margin"]
   * @default "0.5rem"
   */
  spacing?: SystemProps["margin"]
}

/**
 * The `PinInput` component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 *
 * @see Docs https://chakra-ui.com/docs/components/pin-input
 */
export const PinInput = forwardRef<PinInputProps, "div">(function PinInput(
  props,
  ref,
) {
  const styles = useStyleConfig("PinInput", props)

  const { children, ...rest } = omitThemingProps(props)
  const { spacing = "0.5rem", onChange, value, ...containerProps } = rest
  const context = usePinInput(rest)

  const clones = getValidChildren(children).map((child, index) =>
    cloneElement(child, { __css: styles, index: index }),
  )

  const containerStyles = {
    display: "inline-flex",
    alignItems: "center",
  }

  return (
    <PinInputProvider value={context}>
      <chakra.div
        ref={useMergeRefs(ref, context.containerRef)}
        {...containerProps}
        className={cx("chakra-pin-input")}
        gap={spacing}
        __css={containerStyles}
      >
        {clones}
      </chakra.div>
    </PinInputProvider>
  )
})

PinInput.displayName = "PinInput"

export interface PinInputFieldProps extends HTMLChakraProps<"input"> {}

export const PinInputField = forwardRef<PinInputFieldProps, "input">(
  function PinInputField(props, ref) {
    const inputProps = usePinInputField(props, ref)
    return (
      <chakra.input
        {...inputProps}
        className={cx("chakra-pin-input__field", props.className)}
      />
    )
  },
)

PinInputField.displayName = "PinInputField"
