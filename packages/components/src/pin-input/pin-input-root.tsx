import {
  omitThemingProps,
  SystemProps,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { chakra, forwardRef, HTMLChakraProps, useStyleConfig } from "../system"
import { getValidChildren } from "@chakra-ui/utils/children"
import { cx } from "@chakra-ui/utils/cx"
import { cloneElement } from "react"
import { useMergeRefs } from "@chakra-ui/hooks/use-merge-refs"
import { PinInputProvider } from "./pin-input-context"
import { usePinInput, UsePinInputProps } from "./use-pin-input"

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

export interface PinInputRootProps
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
export const PinInputRoot = forwardRef<PinInputRootProps, "div">(
  function PinInput(props, ref) {
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
          className={cx("chakra-pin-input", props.className)}
          gap={spacing}
          __css={containerStyles}
        >
          {clones}
        </chakra.div>
      </PinInputProvider>
    )
  },
)

PinInputRoot.displayName = "PinInputRoot"
