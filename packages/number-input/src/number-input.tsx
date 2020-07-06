import { TriangleDownIcon, TriangleUpIcon } from "./number-input.icons"
import {
  chakra,
  PropsOf,
  forwardRef,
  StylesProvider,
  useStyles,
  omitThemingProps,
  useStyleConfig,
  ThemingProps,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from "./use-number-input"

interface NumberInputContext extends Omit<UseNumberInputReturn, "htmlProps"> {}

/**
 * React context used to communicate between components
 */
const [NumberInputContextProvider, useNumberInputContext] = createContext<
  NumberInputContext
>({
  name: "NumberInputContext",
  errorMessage:
    "NumberInput: Cannot find `NumberInputContext`, seems you forgot to wrap number input's components within <NumberInput/>",
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
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean
}

export type NumberInputProps = UseNumberInputProps &
  ThemingProps &
  InputOptions &
  Omit<PropsOf<typeof chakra.div>, "onChange" | "value" | "defaultValue">

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
export const NumberInput = React.forwardRef(function NumberInput(
  props: NumberInputProps,
  ref: React.Ref<any>,
) {
  const styles = useStyleConfig("NumberInput", props)
  const inputProps = omitThemingProps(props)

  const { htmlProps, ...context } = useNumberInput(inputProps)
  const _context = React.useMemo(() => context, [context])

  return (
    <NumberInputContextProvider value={_context}>
      <StylesProvider value={styles}>
        <chakra.div ref={ref} {...htmlProps} __css={{ position: "relative" }} />
      </StylesProvider>
    </NumberInputContextProvider>
  )
})

if (__DEV__) {
  NumberInput.displayName = "NumberInput"
}

export type NumberInputStepperProps = PropsOf<typeof chakra.div>

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
export const NumberInputStepper = React.forwardRef(function NumberInputStepper(
  props: NumberInputStepperProps,
  ref: React.Ref<any>,
) {
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
})

if (__DEV__) {
  NumberInputStepper.displayName = "NumberInputStepper"
}

export type NumberInputFieldProps = PropsOf<typeof chakra.input>

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
export const NumberInputField = forwardRef<NumberInputFieldProps>(
  function NumberInputField(props, ref) {
    const { getInputProps } = useNumberInputContext()
    const input = getInputProps({ ...props, ref })
    const styles = useStyles()

    return (
      <chakra.input
        {...input}
        __css={{
          width: "100%",
          ...styles.input,
        }}
      />
    )
  },
)

if (__DEV__) {
  NumberInputField.displayName = "NumberInputField"
}

/**
 * NumberInputStepper - Theming
 *
 * To style the number input's stepper buttons globally, change the styles in
 * `theme.components.NumberInput` under the `Stepper` key
 *
 */
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

export type NumberDecrementStepperProps = PropsOf<typeof StyledStepper>

/**
 * NumberDecrementStepper
 *
 * React component used to decrement the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberDecrementStepper = React.forwardRef(
  function NumberDecrementStepper(
    props: NumberDecrementStepperProps,
    ref: React.Ref<any>,
  ) {
    const styles = useStyles()
    const { getDecrementButtonProps } = useNumberInputContext()
    const decrement = getDecrementButtonProps({ ...props, ref })

    return (
      <StyledStepper {...decrement} __css={styles.Stepper}>
        {props.children ?? <TriangleDownIcon />}
      </StyledStepper>
    )
  },
)

if (__DEV__) {
  NumberDecrementStepper.displayName = "NumberDecrementStepper"
}

export type NumberIncrementStepperProps = PropsOf<typeof StyledStepper>

/**
 * NumberIncrementStepper
 *
 * React component used to increment the number input's value
 *
 * It renders a `div` with `role=button` by default
 */
export const NumberIncrementStepper = forwardRef(
  function NumberIncrementStepper(
    props: NumberIncrementStepperProps,
    ref: React.Ref<any>,
  ) {
    const { getIncrementButtonProps } = useNumberInputContext()
    const increment = getIncrementButtonProps({ ...props, ref })
    const styles = useStyles()

    return (
      <StyledStepper {...increment} __css={styles.Stepper}>
        {props.children ?? <TriangleUpIcon />}
      </StyledStepper>
    )
  },
)

if (__DEV__) {
  NumberIncrementStepper.displayName = "NumberIncrementStepper"
}
