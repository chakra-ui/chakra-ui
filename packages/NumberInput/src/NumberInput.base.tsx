import React from "react"
import {
  NumberInputHookProps,
  NumberInputHookReturn,
  useNumberInput,
} from "./NumberInput.hook"
import { createContext } from "@chakra-ui/utils"
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icon-glyphs"

type NumberInputContext = Omit<NumberInputHookReturn, "htmlProps">
const [NumberInputContextProvider, useNumberInputContext] = createContext<
  NumberInputContext
>()

type PropsOf<T extends React.ElementType> = React.ComponentProps<T>

export type BaseNumberInputProps = NumberInputHookProps &
  React.HTMLAttributes<HTMLDivElement>

export const BaseNumberInput = React.forwardRef(
  (props: BaseNumberInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { htmlProps, ...context } = useNumberInput(props)
    return (
      <NumberInputContextProvider value={context}>
        <div ref={ref} data-chakra-numberinput="" {...htmlProps} />
      </NumberInputContextProvider>
    )
  },
)

export type BaseStepperGroupProps = PropsOf<"div">

export const BaseStepperGroup = React.forwardRef(
  (props: BaseStepperGroupProps, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        data-chakra-numberinput-stepper=""
        aria-hidden
        {...props}
      />
    )
  },
)

export type BaseNumberInputFieldProps = PropsOf<"input">

export const BaseNumberInputField = React.forwardRef(
  (props: BaseNumberInputFieldProps, ref: React.Ref<HTMLInputElement>) => {
    const { getInputProps } = useNumberInputContext()
    return (
      <input
        data-chakra-numberinput-input=""
        {...getInputProps({ ...props, ref })}
      />
    )
  },
)

export const BaseDecrementStepper = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<any>) => {
    const { getDecrementButtonProps } = useNumberInputContext()
    return (
      <div
        data-chakra-numberinput-decrement=""
        ref={ref}
        {...getDecrementButtonProps({ ...props })}
      />
    )
  },
)

BaseDecrementStepper.defaultProps = {
  children: <ArrowDownIcon />,
}

export const BaseIncrementStepper = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<any>) => {
    const { getIncrementButtonProps } = useNumberInputContext()
    return (
      <div
        data-chakra-numberinput-decrement=""
        ref={ref}
        {...getIncrementButtonProps({ ...props })}
      />
    )
  },
)

BaseIncrementStepper.defaultProps = {
  children: <ArrowUpIcon />,
}
