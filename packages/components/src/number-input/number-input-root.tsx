import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import {
  NumberInputContextProvider,
  NumberInputStylesProvider,
} from "./number-input-context"
import { splitNumberInputProps } from "./number-input-props"
import { useNumberInput, UseNumberInputProps } from "./use-number-input"

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

export interface NumberInputRootProps
  extends UseNumberInputProps,
    ThemingProps<"NumberInput">,
    InputOptions,
    Omit<HTMLChakraProps<"div">, keyof UseNumberInputProps> {}

/**
 * NumberInput
 *
 * React component that provides context and logic to all
 * number input sub-components.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chakra-ui.com/numberinput
 */
export const NumberInputRoot = forwardRef<NumberInputRootProps, "div">(
  function NumberInputRoot(props, ref) {
    const styles = useMultiStyleConfig("NumberInput", props)

    const ownProps = omitThemingProps(props)
    const [hookProps, rootProps] = splitNumberInputProps(ownProps)

    const api = useNumberInput(hookProps)

    return (
      <NumberInputContextProvider value={api}>
        <NumberInputStylesProvider value={styles}>
          <chakra.div
            {...rootProps}
            ref={ref}
            className={cx("chakra-numberinput", props.className)}
            __css={styles.root}
          />
        </NumberInputStylesProvider>
      </NumberInputContextProvider>
    )
  },
)

NumberInputRoot.displayName = "NumberInput"
