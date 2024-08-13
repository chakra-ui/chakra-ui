"use client"

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
} = createSlotRecipeContext("pinInput")

export { usePinInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootProps
  extends HTMLChakraProps<"div", ArkPinInput.RootBaseProps>,
    SlotRecipeProps<"pinInput">,
    UnstyledProp {}

export const PinInputRoot = withProvider<HTMLDivElement, PinInputRootProps>(
  ArkPinInput.Root,
  "root",
  { forwardProps: ["mask"] },
)

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputControlProps
  extends HTMLChakraProps<"div", ArkPinInput.ControlBaseProps> {}

export const PinInputControl = withContext<
  HTMLDivElement,
  PinInputControlProps
>(ArkPinInput.Control, "control")

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputInputProps
  extends HTMLChakraProps<"input", ArkPinInput.InputBaseProps> {}

export const PinInputInput = withContext<HTMLInputElement, PinInputInputProps>(
  ArkPinInput.Input,
  "input",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputLabelProps extends HTMLChakraProps<"label"> {}

export const PinInputLabel = withContext<HTMLLabelElement, PinInputLabelProps>(
  ArkPinInput.Label,
  "label",
)
