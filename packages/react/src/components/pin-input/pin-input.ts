"use client"

import type { Assign } from "@ark-ui/react"
import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: usePinInputStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "pinInput" })

export { usePinInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootProviderBaseProps
  extends
    Assign<ArkPinInput.RootProviderBaseProps, SlotRecipeProps<"pinInput">>,
    UnstyledProp {}

export interface PinInputRootProviderProps extends HTMLChakraProps<
  "div",
  PinInputRootProviderBaseProps
> {}

export const PinInputRootProvider = withProvider<
  HTMLDivElement,
  PinInputRootProviderProps
>(ArkPinInput.RootProvider, "root", { forwardAsChild: true })
PinInputRootProvider.displayName = "PinInputRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootBaseProps
  extends
    Assign<ArkPinInput.RootBaseProps, SlotRecipeProps<"pinInput">>,
    UnstyledProp {}

export interface PinInputRootProps extends HTMLChakraProps<
  "div",
  PinInputRootBaseProps
> {}

export const PinInputRoot = withProvider<HTMLDivElement, PinInputRootProps>(
  ArkPinInput.Root,
  "root",
  { forwardProps: ["mask"], forwardAsChild: true },
)
PinInputRoot.displayName = "PinInputRoot"

////////////////////////////////////////////////////////////////////////////////////

export const PinInputPropsProvider =
  PropsProvider as React.Provider<PinInputRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputControlProps
  extends HTMLChakraProps<"div", ArkPinInput.ControlBaseProps>, UnstyledProp {}

export const PinInputControl = withContext<
  HTMLDivElement,
  PinInputControlProps
>(ArkPinInput.Control, "control", { forwardAsChild: true })
PinInputControl.displayName = "PinInputControl"

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputInputProps
  extends HTMLChakraProps<"input", ArkPinInput.InputBaseProps>, UnstyledProp {}

export const PinInputInput = withContext<HTMLInputElement, PinInputInputProps>(
  ArkPinInput.Input,
  "input",
  { forwardAsChild: true },
)
PinInputInput.displayName = "PinInputInput"

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputLabelProps
  extends HTMLChakraProps<"label">, UnstyledProp {}

export const PinInputLabel = withContext<HTMLLabelElement, PinInputLabelProps>(
  ArkPinInput.Label,
  "label",
  { forwardAsChild: true },
)
PinInputLabel.displayName = "PinInputLabel"

////////////////////////////////////////////////////////////////////////////////////

export const PinInputContext = ArkPinInput.Context
export const PinInputHiddenInput = ArkPinInput.HiddenInput
PinInputHiddenInput.displayName = "PinInputHiddenInput"

export interface PinInputValueChangeDetails
  extends ArkPinInput.ValueChangeDetails {}
