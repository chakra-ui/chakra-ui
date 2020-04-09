import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
  chakra,
  PropsOf,
  ThemingProvider,
  useSplitThemingProps,
  useThemingContext,
} from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import React from "react"
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from "./NumberInput.hook"

type NumberInputContext = Omit<UseNumberInputReturn, "htmlProps">

/**
 * React context used to communicate between components
 */
const [NumberInputContextProvider, useNumberInputContext] = createContext<
  NumberInputContext
>({
  name: "NumberInputContext",
  strict: true,
  errorMessage:
    "[Chakra UI]: `useNumberInputContext` must be used within `NumberInputContextProvider` ",
})

export type NumberInputProps = UseNumberInputProps &
  Omit<PropsOf<typeof StyledRoot>, "onChange" | "value" | "defaultValue">

/**
 * NumberInput - Theming
 *
 * To style the number input's container globally, change the styles in
 * `theme.components.NumberInput` under the `Root` key
 */
const StyledRoot = chakra("div", {
  themeKey: "NumberInput.Root",
  baseStyle: {
    position: "relative",
  },
})

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
export const NumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.Ref<HTMLDivElement>) => {
    const [themingProps, componentProps] = useSplitThemingProps(
      props,
      "NumberInput",
    )

    const { htmlProps, ...context } = useNumberInput(componentProps)
    const _context = React.useMemo(() => context, [context])

    return (
      <ThemingProvider value={themingProps}>
        <NumberInputContextProvider value={_context}>
          <StyledRoot ref={ref} {...themingProps} {...htmlProps} />
        </NumberInputContextProvider>
      </ThemingProvider>
    )
  },
)

if (__DEV__) {
  NumberInput.displayName = "NumberInput"
}

/**
 * NumberInputStepper - Theming
 *
 * To style the number input button group globally, change the styles in
 * `theme.components.NumberInput` under the `StepperGroup` key
 */
export const StyledStepperGroup = chakra("div", {
  themeKey: "NumberInput.StepperGroup",
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    top: "0",
    zIndex: 1,
  },
  attrs: {
    "aria-hidden": true,
  },
})

export type NumberInputStepperProps = PropsOf<typeof StyledStepperGroup>

/**
 * NumberInputStepper
 *
 * React component used to group the increment and decrement
 * button spinners.
 *
 * It renders a `div` by default.
 *
 * @see Docs http://chakra-ui.com/numberinput
 */
export const NumberInputStepper = React.forwardRef(
  (props: NumberInputStepperProps, ref: React.Ref<any>) => {
    const themingProps = useThemingContext()
    return <StyledStepperGroup ref={ref} {...themingProps} {...props} />
  },
)

if (__DEV__) {
  NumberInputStepper.displayName = "NumberInputStepper"
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
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean
}

/**
 * NumberInputField - Theming
 *
 * By default, the number input field inherits the theming
 * of the `Input` component.
 */
const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "Input",
  baseStyle: {
    width: "100%",
  },
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export type NumberInputFieldProps = PropsOf<typeof StyledInput>

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
export const NumberInputField = React.forwardRef(
  (props: NumberInputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const themingProps = useThemingContext()

    const { getInputProps } = useNumberInputContext()
    const htmlProps = getInputProps({ ...props, ref })

    return (
      <StyledInput
        {...themingProps}
        //@ts-ignore `size` is a valid `input` prop and it clashes with the size theming prop.
        size={themingProps?.size}
        {...htmlProps}
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
  themeKey: "NumberInput.Stepper",
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
  (props: NumberDecrementStepperProps, ref: React.Ref<any>) => {
    const themingProps = useThemingContext()

    const { getDecrementButtonProps } = useNumberInputContext()
    const htmlProps = getDecrementButtonProps({ ...props, ref })

    return (
      <StyledStepper {...themingProps} {...htmlProps}>
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
export const NumberIncrementStepper = React.forwardRef(
  (props: NumberIncrementStepperProps, ref: React.Ref<any>) => {
    const themingProps = useThemingContext()

    const { getIncrementButtonProps } = useNumberInputContext()
    const htmlProps = getIncrementButtonProps({ ...props, ref })

    return (
      <StyledStepper {...themingProps} {...htmlProps}>
        {props.children ?? <TriangleUpIcon />}
      </StyledStepper>
    )
  },
)

if (__DEV__) {
  NumberIncrementStepper.displayName = "NumberIncrementStepper"
}
