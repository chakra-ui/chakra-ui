"use client"

import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useNumberInputStyles,
} = createStyleContext("numberInput")

export { useNumberInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputRootProps
  extends HTMLChakraProps<"div", ArkNumberInput.RootBaseProps>,
    SlotRecipeProps<"numberInput">,
    UnstyledProp {}

export const NumberInputRoot = withProvider<
  HTMLDivElement,
  NumberInputRootProps
>(ArkNumberInput.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputControlProps
  extends HTMLChakraProps<"div", ArkNumberInput.ControlBaseProps> {}

export const NumberInputControl = withContext<
  HTMLDivElement,
  NumberInputControlProps
>(ArkNumberInput.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputLabelProps
  extends HTMLChakraProps<"label", ArkNumberInput.LabelBaseProps> {}

export const NumberInputLabel = withContext<
  HTMLLabelElement,
  NumberInputLabelProps
>(ArkNumberInput.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputInputProps
  extends HTMLChakraProps<"input", ArkNumberInput.InputBaseProps> {}

export const NumberInputInput = withContext<
  HTMLInputElement,
  NumberInputInputProps
>(ArkNumberInput.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

const UpIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </chakra.svg>
)

export interface NumberInputIncrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.IncrementTriggerBaseProps> {}

export const NumberInputIncrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>(ArkNumberInput.IncrementTrigger, "incrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <UpIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

const DownIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </chakra.svg>
)

export interface NumberInputDecrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.DecrementTriggerBaseProps> {}

export const NumberInputDecrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>(ArkNumberInput.DecrementTrigger, "decrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <DownIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputScrubberProps
  extends HTMLChakraProps<"div", ArkNumberInput.ScrubberBaseProps> {}

export const NumberInputScrubber = withContext<
  HTMLDivElement,
  NumberInputScrubberProps
>(ArkNumberInput.Scrubber, "scrubber", { forwardAsChild: true })
