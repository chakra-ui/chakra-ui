"use client"

import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { ChevronDownIcon, ChevronUpIcon } from "../icons"

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

export interface NumberInputIncrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.IncrementTriggerBaseProps> {}

export const NumberInputIncrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>(ArkNumberInput.IncrementTrigger, "incrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronUpIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputDecrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.DecrementTriggerBaseProps> {}

export const NumberInputDecrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>(ArkNumberInput.DecrementTrigger, "decrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronDownIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputScrubberProps
  extends HTMLChakraProps<"div", ArkNumberInput.ScrubberBaseProps> {}

export const NumberInputScrubber = withContext<
  HTMLDivElement,
  NumberInputScrubberProps
>(ArkNumberInput.Scrubber, "scrubber", { forwardAsChild: true })
