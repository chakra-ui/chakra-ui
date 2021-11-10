import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { TriangleDownIcon, TriangleUpIcon } from "./icons"
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from "./use-number-input"

interface NumberInputContext extends Omit<UseNumberInputReturn, "htmlProps"> {}

/**
 * React context used to communicate between components
 */
const [
  NumberInputProvider,
  useNumberInputContext,
] = createContext<NumberInputContext>({
  name: "NumberInputContext",
  errorMessage:
    "useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components within <NumberInput />",
})

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
  /**
   * If `true`, the input element will span the full width of its parent
   *
   * @deprecated
   * This component defaults to 100% width,
   * please use the props `maxWidth` or `width` to configure
   */
  isFullWidth?: boolean
}

export interface NumberInputProps
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
export const NumberInput = forwardRef<NumberInputProps, "div">((props, ref) => {
  const styles = useMultiStyleConfig("NumberInput", props)
  const ownProps = omitThemingProps(props)

  const { htmlProps, ...context } = useNumberInput(ownProps)
  const ctx = React.useMemo(() => context, [context])

  return (
    <NumberInputProvider value={ctx}>
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...htmlProps}
          __css={{
            position: "relative",
            zIndex: 0,
          }}
        />
      </StylesProvider>
    </NumberInputProvider>
  )
})

if (__DEV__) {
  NumberInput.displayName = "NumberInput"
}

export interface NumberInputStepperProps extends HTMLChakraProps<"div"> {}

/**
 * NumberInputStepper
 *
 * React component used to group the increment and decrement
 * button spinners.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chakra-ui.com/components/number-input
 */
export const NumberInputStepper = forwardRef<NumberInputStepperProps, "div">(
  (props, ref) => {
    const styles = useStyles()
    return (
      <chakra.div
        aria-hidden
        ref={ref}
        {...props}
        __css={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "0",
          right: "0px",
          margin: "1px",
          height: "calc(100% - 2px)",
          zIndex: 1,
          ...styles.stepperGroup,
        }}
      />
    )
  },
)

if (__DEV__) {
  NumberInputStepper.displayName = "NumberInputStepper"
}

export interface NumberInputFieldProps extends HTMLChakraProps<"input"> {}

/**
 * NumberInputField
 *
 * React component that represents the actual `input` field
 * where users can type to edit numeric values.
 *
 * It renders an `input` by default and ensures only numeric
 * values can be typed.
 *
 * @see Docs http://chakra-ui.com/numberinput
 */
export const NumberInputField = forwardRef<NumberInputFieldProps, "input">(
  (props, ref) => {
    const { getInputProps } = useNumberInputContext()

    const input = getInputProps(props, ref)
    const styles = useStyles()

    return (
      <chakra.input
        {...input}
        __css={{
          width: "100%",
          ...styles.field,
        }}
      />
    )
  },
)

if (__DEV__) {
  NumberInputField.displayName = "NumberInputField"
}

export const StyledStepper = chakra("div", {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    transition: "all 0.3s",
    userSelect: "none",
    cursor: "pointer",
    lineHeight: "normal",
  },
})

export interface NumberDecrementStepperProps extends HTMLChakraProps<"div"> {}

/**
 * NumberDecrementStepper
 *
 * React component used to decrement the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberDecrementStepper = forwardRef<
  NumberDecrementStepperProps,
  "div"
>((props, ref) => {
  const styles = useStyles()
  const { getDecrementButtonProps } = useNumberInputContext()
  const decrement = getDecrementButtonProps(props, ref)

  return (
    <StyledStepper {...decrement} __css={styles.stepper}>
      {props.children ?? <TriangleDownIcon />}
    </StyledStepper>
  )
})

if (__DEV__) {
  NumberDecrementStepper.displayName = "NumberDecrementStepper"
}

export interface NumberIncrementStepperProps extends HTMLChakraProps<"div"> {}

/**
 * NumberIncrementStepper
 *
 * React component used to increment the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberIncrementStepper = forwardRef<
  NumberIncrementStepperProps,
  "div"
>((props, ref) => {
  const { getIncrementButtonProps } = useNumberInputContext()
  const increment = getIncrementButtonProps(props, ref)
  const styles = useStyles()

  return (
    <StyledStepper {...increment} __css={styles.stepper}>
      {props.children ?? <TriangleUpIcon />}
    </StyledStepper>
  )
})

if (__DEV__) {
  NumberIncrementStepper.displayName = "NumberIncrementStepper"
}
