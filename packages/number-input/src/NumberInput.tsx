import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext, __DEV__ } from "@chakra-ui/utils"
import React from "react"
import {
  useNumberInput,
  UseNumberInputProps,
  UseNumberInputReturn,
} from "./NumberInput.hook"

type NumberInputContext = Omit<UseNumberInputReturn, "htmlProps"> & ThemingProps

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

const StyledRoot = chakra("div", {
  themeKey: "NumberInput.Root",
  baseStyle: {
    position: "relative",
  },
})

export const NumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { htmlProps, ...context } = useNumberInput(props)

    const { variant, size, colorScheme } = props

    const contextValue = React.useMemo(
      () => ({ ...context, variant, size, colorScheme }),
      [colorScheme, context, size, variant],
    )

    return (
      <NumberInputContextProvider value={contextValue}>
        <StyledRoot ref={ref} data-chakra-numberinput="" {...htmlProps} />
      </NumberInputContextProvider>
    )
  },
)

if (__DEV__) {
  NumberInput.displayName = "NumberInput"
}

export const StyledStepperGroup = chakra("div", {
  themeKey: "NumberInput.StepperGroup",
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    top: "0",
    zIndex: 1,
  },
})

export type NumberInputStepperProps = PropsOf<typeof StyledStepperGroup>

export const NumberInputStepper = React.forwardRef(
  (props: NumberInputStepperProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <StyledStepperGroup
        ref={ref}
        data-chakra-numberinput-stepper=""
        aria-hidden
        {...props}
      />
    )
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

const StyledInput = chakra<"input", InputOptions>("input", {
  themeKey: "Input",
  baseStyle: {
    width: "100%",
  },
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export type NumberInputFieldProps = PropsOf<typeof StyledInput>

export const NumberInputField = React.forwardRef(
  (props: NumberInputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      getInputProps,
      variant,
      size,
      colorScheme,
    } = useNumberInputContext()

    return (
      <StyledInput
        variant={variant}
        //@ts-ignore `size` is a valid `input` prop and it clashes with the size theming prop.
        size={size}
        colorScheme={colorScheme}
        data-chakra-numberinput-input=""
        {...getInputProps({ ...props, ref })}
      />
    )
  },
)

if (__DEV__) {
  NumberInputField.displayName = "NumberInputField"
}

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

export const NumberDecrementStepper = React.forwardRef(
  (props: NumberDecrementStepperProps, ref: React.Ref<any>) => {
    const {
      getDecrementButtonProps,
      variant,
      size,
      colorScheme,
    } = useNumberInputContext()
    return (
      <StyledStepper
        variant={variant}
        size={size}
        colorScheme={colorScheme}
        data-chakra-numberinput-decrement=""
        {...getDecrementButtonProps({ ...props, ref })}
      >
        {props.children ?? <TriangleDownIcon />}
      </StyledStepper>
    )
  },
)

if (__DEV__) {
  NumberDecrementStepper.displayName = "NumberDecrementStepper"
}

export type NumberIncrementStepperProps = PropsOf<typeof StyledStepper>

export const NumberIncrementStepper = React.forwardRef(
  (props: NumberIncrementStepperProps, ref: React.Ref<any>) => {
    const {
      getIncrementButtonProps,
      variant,
      size,
      colorScheme,
    } = useNumberInputContext()

    return (
      <StyledStepper
        variant={variant}
        size={size}
        colorScheme={colorScheme}
        data-chakra-numberinput-decrement=""
        {...getIncrementButtonProps({ ...props, ref })}
      >
        {props.children ?? <TriangleUpIcon />}
      </StyledStepper>
    )
  },
)

if (__DEV__) {
  NumberIncrementStepper.displayName = "NumberIncrementStepper"
}
