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
  extends Assign<
      ArkPinInput.RootProviderBaseProps,
      SlotRecipeProps<"pinInput">
    >,
    UnstyledProp {}

export interface PinInputRootProviderProps
  extends HTMLChakraProps<"div", PinInputRootProviderBaseProps> {}

export const PinInputRootProvider = withProvider<
  HTMLDivElement,
  PinInputRootProviderProps
>(ArkPinInput.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootBaseProps
  extends Assign<ArkPinInput.RootBaseProps, SlotRecipeProps<"pinInput">>,
    UnstyledProp {}

export interface PinInputRootProps
  extends HTMLChakraProps<"div", PinInputRootBaseProps> {}

export const PinInputRoot = withProvider<HTMLDivElement, PinInputRootProps>(
  ArkPinInput.Root,
  "root",
  { forwardProps: ["mask"], forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const PinInputPropsProvider =
  PropsProvider as React.Provider<PinInputRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputControlProps
  extends HTMLChakraProps<"div", ArkPinInput.ControlBaseProps> {}

export const PinInputControl = withContext<
  HTMLDivElement,
  PinInputControlProps
>(ArkPinInput.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputInputProps
  extends HTMLChakraProps<"input", ArkPinInput.InputBaseProps> {}

export const PinInputInput = withContext<HTMLInputElement, PinInputInputProps>(
  ArkPinInput.Input,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputLabelProps extends HTMLChakraProps<"label"> {}

export const PinInputLabel = withContext<HTMLLabelElement, PinInputLabelProps>(
  ArkPinInput.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const PinInputContext = ArkPinInput.Context
export const PinInputHiddenInput = ArkPinInput.HiddenInput

export interface PinInputValueChangeDetails
  extends ArkPinInput.ValueChangeDetails {}
