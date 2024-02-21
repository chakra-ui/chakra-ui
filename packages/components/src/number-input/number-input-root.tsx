import {
  defineStyle,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { splitFieldProps, useFieldProps } from "../field"
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
    const [fieldProps, localProps] = splitFieldProps(ownProps)

    const _fieldProps = useFieldProps(fieldProps)
    const api = useNumberInput(_fieldProps)

    const rootStyles = defineStyle({
      position: "relative",
      zIndex: 0,
      ...styles.root,
    })

    return (
      <NumberInputContextProvider value={api}>
        <NumberInputStylesProvider value={styles}>
          <chakra.div
            {...localProps}
            ref={ref}
            className={cx("chakra-numberinput", props.className)}
            __css={rootStyles}
          />
        </NumberInputStylesProvider>
      </NumberInputContextProvider>
    )
  },
)

NumberInputRoot.displayName = "NumberInput"

export const StyledStepper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    transitionProperty: "common",
    transitionDuration: "normal",
    userSelect: "none",
    cursor: "pointer",
    lineHeight: "normal",
  },
})
