import { ThemingProps, omitThemingProps } from "../styled-system"
import { useStyleConfig } from "../system"
import {
  PinInputDescendantsProvider,
  PinInputProvider,
  PinInputStylesProvider,
} from "./pin-input-context"
import { UsePinInputProps, usePinInput } from "./use-pin-input"

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
export function PinInputRoot(props: PinInputRootProps) {
  const styles = useStyleConfig("PinInput", props)

  const { children, ...rest } = omitThemingProps(props)
  const { descendants, ...context } = usePinInput(rest)

  return (
    <PinInputDescendantsProvider value={descendants}>
      <PinInputStylesProvider value={styles}>
        <PinInputProvider value={context}>{children}</PinInputProvider>
      </PinInputStylesProvider>
    </PinInputDescendantsProvider>
  )
}

PinInputRoot.displayName = "PinInput"
