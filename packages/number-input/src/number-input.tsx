import { useFormControlProps } from "@chakra-ui/form-control"
import { createContext } from "@chakra-ui/react-context"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useMemo } from "react"
import { TriangleDownIcon, TriangleUpIcon } from "./icons"
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from "./use-number-input"

const [NumberInputStylesProvider, useNumberInputStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NumberInputStylesContext`,
  errorMessage: `useNumberInputStyles returned is 'undefined'. Seems you forgot to wrap the components in "<NumberInput />" `,
})

export { useNumberInputStyles }

interface NumberInputContext extends Omit<UseNumberInputReturn, "htmlProps"> {}

/**
 * React context used to communicate between components
 */
const [NumberInputProvider, useNumberInputContext] =
  createContext<NumberInputContext>({
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
export const NumberInput = forwardRef<NumberInputProps, "div">(
  function NumberInput(props, ref) {
    const styles = useMultiStyleConfig("NumberInput", props)

    const ownProps = omitThemingProps(props)
    const controlProps = useFormControlProps(ownProps)

    const { htmlProps, ...context } = useNumberInput(controlProps)
    const ctx = useMemo(() => context, [context])

    return (
      <NumberInputProvider value={ctx}>
        <NumberInputStylesProvider value={styles}>
          <chakra.div
            {...htmlProps}
            ref={ref}
            className={cx("chakra-numberinput", props.className)}
            __css={{
              position: "relative",
              zIndex: 0,
              ...styles.root,
            }}
          />
        </NumberInputStylesProvider>
      </NumberInputProvider>
    )
  },
)

NumberInput.displayName = "NumberInput"

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
  function NumberInputStepper(props, ref) {
    const styles = useNumberInputStyles()
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
          insetEnd: "0px",
          margin: "1px",
          height: "calc(100% - 2px)",
          zIndex: 1,
          ...styles.stepperGroup,
        }}
      />
    )
  },
)

NumberInputStepper.displayName = "NumberInputStepper"

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
  function NumberInputField(props, ref) {
    const { getInputProps } = useNumberInputContext()

    const input = getInputProps(props, ref)
    const styles = useNumberInputStyles()

    return (
      <chakra.input
        {...input}
        className={cx("chakra-numberinput__field", props.className)}
        __css={{
          width: "100%",
          ...styles.field,
        }}
      />
    )
  },
)

NumberInputField.displayName = "NumberInputField"

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
>(function NumberDecrementStepper(props, ref) {
  const styles = useNumberInputStyles()
  const { getDecrementButtonProps } = useNumberInputContext()
  const decrement = getDecrementButtonProps(props, ref)

  return (
    <StyledStepper {...decrement} __css={styles.stepper}>
      {props.children ?? <TriangleDownIcon />}
    </StyledStepper>
  )
})

NumberDecrementStepper.displayName = "NumberDecrementStepper"

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
>(function NumberIncrementStepper(props, ref) {
  const { getIncrementButtonProps } = useNumberInputContext()
  const increment = getIncrementButtonProps(props, ref)
  const styles = useNumberInputStyles()

  return (
    <StyledStepper {...increment} __css={styles.stepper}>
      {props.children ?? <TriangleUpIcon />}
    </StyledStepper>
  )
})

NumberIncrementStepper.displayName = "NumberIncrementStepper"
