"use client"

import type { Assign } from "@ark-ui/react"
import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { ChevronDownIcon, ChevronUpIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useNumberInputStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "numberInput" })

export { useNumberInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputRootProviderBaseProps
  extends Assign<
      ArkNumberInput.RootProviderBaseProps,
      SlotRecipeProps<"numberInput">
    >,
    UnstyledProp {}

export interface NumberInputRootProviderProps
  extends HTMLChakraProps<"div", NumberInputRootProviderBaseProps> {}

export const NumberInputRootProvider = withProvider<
  HTMLDivElement,
  NumberInputRootProviderProps
>(ArkNumberInput.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputRootBaseProps
  extends Assign<ArkNumberInput.RootBaseProps, SlotRecipeProps<"numberInput">>,
    UnstyledProp {}

export interface NumberInputRootProps
  extends HTMLChakraProps<"div", NumberInputRootBaseProps> {}

export const NumberInputRoot = withProvider<
  HTMLDivElement,
  NumberInputRootProps
>(ArkNumberInput.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const NumberInputPropsProvider =
  PropsProvider as React.Provider<NumberInputRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputLabelProps
  extends HTMLChakraProps<"label", ArkNumberInput.LabelBaseProps>,
    UnstyledProp {}

export const NumberInputLabel = withContext<
  HTMLLabelElement,
  NumberInputLabelProps
>(ArkNumberInput.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputInputProps
  extends HTMLChakraProps<"input", ArkNumberInput.InputBaseProps>,
    UnstyledProp {}

export const NumberInputInput = withContext<
  HTMLInputElement,
  NumberInputInputProps
>(ArkNumberInput.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputIncrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.IncrementTriggerBaseProps>,
    UnstyledProp {}

export const NumberInputIncrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>(ArkNumberInput.IncrementTrigger, "incrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronUpIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputDecrementTriggerProps
  extends HTMLChakraProps<"button", ArkNumberInput.DecrementTriggerBaseProps>,
    UnstyledProp {}

export const NumberInputDecrementTrigger = withContext<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>(ArkNumberInput.DecrementTrigger, "decrementTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <ChevronDownIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputControlProps
  extends HTMLChakraProps<"div", ArkNumberInput.ControlBaseProps>,
    UnstyledProp {}

export const NumberInputControl = withContext<
  HTMLDivElement,
  NumberInputControlProps
>(ArkNumberInput.Control, "control", {
  forwardAsChild: true,
  defaultProps: {
    children: (
      <>
        <NumberInputIncrementTrigger />
        <NumberInputDecrementTrigger />
      </>
    ),
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputScrubberProps
  extends HTMLChakraProps<"div", ArkNumberInput.ScrubberBaseProps>,
    UnstyledProp {}

export const NumberInputScrubber = withContext<
  HTMLDivElement,
  NumberInputScrubberProps
>(ArkNumberInput.Scrubber, "scrubber", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface NumberInputValueTextProps
  extends HTMLChakraProps<"span", ArkNumberInput.ValueTextBaseProps>,
    UnstyledProp {}

export const NumberInputValueText = withContext<
  HTMLSpanElement,
  NumberInputValueTextProps
>(ArkNumberInput.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const NumberInputContext = ArkNumberInput.Context

export interface NumberInputValueChangeDetails
  extends ArkNumberInput.ValueChangeDetails {}

export interface NumberInputFocusChangeDetails
  extends ArkNumberInput.FocusChangeDetails {}

export interface NumberInputValueInvalidDetails
  extends ArkNumberInput.ValueInvalidDetails {}
