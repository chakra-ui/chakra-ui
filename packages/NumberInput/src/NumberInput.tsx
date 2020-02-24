import {
  createChakra,
  syncChild,
  syncParent,
  ThemingProps,
} from "@chakra-ui/system"
import * as React from "react"
import {
  BaseDecrementStepper,
  BaseIncrementStepper,
  BaseNumberInput,
  BaseNumberInputField,
  BaseStepperGroup,
} from "./NumberInput.base"

export const NumberInputStepper = createChakra(BaseStepperGroup, {
  themeKey: "NumberInput.StepperGroup",
  baseStyle: {
    display: "flex",
    flexDir: "column",
    top: "0",
    zIndex: 1,
  },
})

export const $NumberInput = createChakra(BaseNumberInput, {
  baseStyle: {
    position: "relative",
  },
})

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
const Context = React.createContext<ThemingProps>({})

const NumberInput = syncParent($NumberInput)(Context)
const NumberInputField = syncChild($NumberInputField)(Context)
const NumberDecrementStepper = syncChild($NumberDecrementStepper)(Context)
const NumberIncrementStepper = syncChild($NumberIncrementStepper)(Context)

export {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
}
