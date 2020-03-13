import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { createChakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import React from "react"
import {
  NumberInputHookProps,
  NumberInputHookReturn,
  useNumberInput,
} from "./NumberInput.hook"

type NumberInputContext = Omit<NumberInputHookReturn, "htmlProps"> &
  ThemingProps

const [NumberInputContextProvider, useNumberInputContext] = createContext<
  NumberInputContext
>()

export type NumberInputProps = NumberInputHookProps &
  Omit<PropsOf<typeof StyledRoot>, "onChange" | "value" | "defaultValue">

const StyledRoot = createChakra("div", {
  themeKey: "NumberInput.Root",
  baseStyle: {
    position: "relative",
  },
})

export const NumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { htmlProps, ...context } = useNumberInput(props)
    const { variant, variantSize, variantColor } = props
    return (
      <NumberInputContextProvider
        value={{ ...context, variant, variantSize, variantColor }}
      >
        <StyledRoot ref={ref} data-chakra-numberinput="" {...htmlProps} />
      </NumberInputContextProvider>
    )
  },
)

export const StyledStepperGroup = createChakra("div", {
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

const StyledInput = createChakra<"input", InputOptions>("input", {
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
      variantSize,
      variantColor,
    } = useNumberInputContext()
    return (
      <StyledInput
        variant={variant}
        variantSize={variantSize}
        variantColor={variantColor}
        data-chakra-numberinput-input=""
        {...getInputProps({ ...props, ref })}
      />
    )
  },
)

NumberInputField.defaultProps = {
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}

const commonOptions = {
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
}

export const StyledDecrementButton = createChakra("div", commonOptions)

export type NumberDecrementStepperProps = PropsOf<typeof StyledDecrementButton>

export const NumberDecrementStepper = React.forwardRef(
  (props: NumberDecrementStepperProps, ref: React.Ref<any>) => {
    const {
      getDecrementButtonProps,
      variant,
      variantSize,
      variantColor,
    } = useNumberInputContext()
    return (
      <StyledDecrementButton
        variant={variant}
        variantSize={variantSize}
        variantColor={variantColor}
        data-chakra-numberinput-decrement=""
        {...getDecrementButtonProps({ ...props, ref } as any)}
      />
    )
  },
)

NumberDecrementStepper.defaultProps = {
  children: <ArrowDownIcon />,
}

const StyledIncrementButton = createChakra("div", commonOptions)

export type NumberIncrementStepperProps = PropsOf<typeof StyledIncrementButton>

export const NumberIncrementStepper = React.forwardRef(
  (props: NumberIncrementStepperProps, ref: React.Ref<any>) => {
    const {
      getIncrementButtonProps,
      variant,
      variantSize,
      variantColor,
    } = useNumberInputContext()
    return (
      <StyledIncrementButton
        variant={variant}
        variantSize={variantSize}
        variantColor={variantColor}
        data-chakra-numberinput-decrement=""
        {...getIncrementButtonProps({ ...props, ref } as any)}
      />
    )
  },
)

NumberIncrementStepper.defaultProps = {
  children: <ArrowUpIcon />,
}
