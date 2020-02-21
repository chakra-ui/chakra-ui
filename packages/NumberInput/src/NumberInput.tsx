import { useMergeRefs } from "@chakra-ui/hooks"
import { createChakra, PropsOf, connect } from "@chakra-ui/system"
import { callAllHandlers as compose, createContext } from "@chakra-ui/utils"
import * as React from "react"
import {
  NumberInputHookProps,
  NumberInputHookReturn,
  useNumberInput,
} from "./NumberInput.hook"
import Icon, { IconProps } from "@chakra-ui/icon"

const [NumberInputContextProvider, useNumberInputContext] = createContext<
  NumberInputHookReturn
>()

export const BaseStepperGroup = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<HTMLDivElement>) => {
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

export const NumberInputStepper = createChakra(BaseStepperGroup, {
  themeKey: "NumberInput.StepperGroup",
  baseStyle: {
    display: "flex",
    flexDir: "column",
    top: "0",
    zIndex: 1,
  },
})

export type NumberInputProps = NumberInputHookProps & PropsOf<"div">

export const BaseNumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.Ref<HTMLDivElement>) => {
    const context = useNumberInput(props)
    return (
      <NumberInputContextProvider value={context}>
        <div ref={ref} data-chakra-numberinput="" {...context.htmlProps} />
      </NumberInputContextProvider>
    )
  },
)

export const $NumberInput = createChakra(BaseNumberInput, {
  baseStyle: {
    position: "relative",
  },
})

export const ArrowUpIcon = (props: IconProps) => (
  <Icon size="0.6em" position="relative" bottom="1px" {...props}>
    <path
      fill="currentColor"
      d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
    />
  </Icon>
)

export const ArrowDownIcon = (props: IconProps) => (
  <Icon size="0.6em" position="relative" top="1px" {...props}>
    <path
      fill="currentColor"
      d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
    />
  </Icon>
)

function useStepper({
  type,
  ...props
}: {
  style?: React.CSSProperties
  type: "increment" | "decrement"
}): PropsOf<"div"> {
  const { isDisabled, upSpinner, downSpinner } = useNumberInputContext()
  return {
    ...props,
    ...(type === "increment" ? upSpinner : downSpinner),
    role: "button",
    tabIndex: -1,
    "aria-disabled": isDisabled ? true : undefined,
    style: {
      ...props.style,
      pointerEvents: isDisabled ? "none" : undefined,
    },
  }
}

export const BaseDecrementStepper = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<HTMLDivElement>) => {
    const spinner = useStepper({ ...props, type: "decrement" })
    return <div ref={ref} data-chakra-numberinput-decrement="" {...spinner} />
  },
)

BaseDecrementStepper.defaultProps = {
  children: <ArrowDownIcon />,
}

export const BaseIncrementStepper = React.forwardRef(
  (props: PropsOf<"div">, ref: React.Ref<HTMLDivElement>) => {
    const spinner = useStepper({ ...props, type: "increment" })
    return <div ref={ref} data-chakra-numberinput-decrement="" {...spinner} />
  },
)

BaseIncrementStepper.defaultProps = {
  children: <ArrowUpIcon />,
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

export const $NumberIncrementStepper = createChakra(
  BaseIncrementStepper,
  commonOptions,
)

export const $NumberDecrementStepper = createChakra(
  BaseDecrementStepper,
  commonOptions,
)

export const BaseNumberInputField = React.forwardRef(
  (props: PropsOf<"input">, ref: React.Ref<HTMLInputElement>) => {
    const { onBlur, onFocus, onKeyDown, onChange, ...rest } = props
    const { input } = useNumberInputContext()

    const inputRef = useMergeRefs(input.ref, ref)
    const handleBlur = compose(onBlur, input.onBlur)
    const handleFocus = compose(onFocus, input.onBlur)
    const handleKeyDown = compose(onKeyDown, input.onKeyDown)
    const handleChange = compose(onChange, input.onChange)

    return (
      <input
        {...input}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...rest}
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

export const $NumberInputField = createChakra<
  typeof BaseNumberInputField,
  InputOptions
>(BaseNumberInputField, {
  themeKey: "Input",
  baseStyle: {
    width: "100%",
  },
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

$NumberInputField.defaultProps = {
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}

// Connect the parent and child components so they can share theming props.
// This means, if you pass `variantSize` from  the parent, it'll propagate to the registered children
const {
  parent: NumberInput,
  children: [NumberInputField, NumberDecrementStepper, NumberIncrementStepper],
} = connect({
  parent: $NumberInput,
  children: [
    $NumberInputField,
    $NumberDecrementStepper,
    $NumberIncrementStepper,
  ],
})

export {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
}
