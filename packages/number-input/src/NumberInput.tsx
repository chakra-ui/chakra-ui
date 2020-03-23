import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { chakra, PropsOf, ThemingProps, SystemProps } from "@chakra-ui/styled"
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
    return (
      <NumberInputContextProvider
        value={{ ...context, variant, size, colorScheme }}
      >
        <StyledRoot ref={ref} data-chakra-numberinput="" {...htmlProps} />
      </NumberInputContextProvider>
    )
  },
)

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
        size={size as any}
        colorScheme={colorScheme}
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

const baseStyle: SystemProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  transition: "all 0.3s",
  userSelect: "none",
  cursor: "pointer",
  lineHeight: "normal",
}

export const StyledDecrementButton = chakra("div", {
  themeKey: "NumberInput.Stepper",
  baseStyle: baseStyle,
})

export type NumberDecrementStepperProps = PropsOf<typeof StyledDecrementButton>

export const NumberDecrementStepper = React.forwardRef(
  (props: NumberDecrementStepperProps, ref: React.Ref<any>) => {
    const {
      getDecrementButtonProps,
      variant,
      size,
      colorScheme,
    } = useNumberInputContext()
    return (
      <StyledDecrementButton
        variant={variant}
        size={size}
        colorScheme={colorScheme}
        data-chakra-numberinput-decrement=""
        {...getDecrementButtonProps({ ...props, ref } as any)}
      />
    )
  },
)

NumberDecrementStepper.defaultProps = {
  children: <ArrowDownIcon />,
}

const StyledIncrementButton = chakra("div", {
  themeKey: "NumberInput.Stepper",
  baseStyle: baseStyle,
})

export type NumberIncrementStepperProps = PropsOf<typeof StyledIncrementButton>

export const NumberIncrementStepper = React.forwardRef(
  (props: NumberIncrementStepperProps, ref: React.Ref<any>) => {
    const {
      getIncrementButtonProps,
      variant,
      size,
      colorScheme,
    } = useNumberInputContext()
    return (
      <StyledIncrementButton
        variant={variant}
        size={size}
        colorScheme={colorScheme}
        data-chakra-numberinput-decrement=""
        {...getIncrementButtonProps({ ...props, ref } as any)}
      />
    )
  },
)

NumberIncrementStepper.defaultProps = {
  children: <ArrowUpIcon />,
}
