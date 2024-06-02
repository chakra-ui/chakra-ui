"use client"

import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: usePinInputStyles,
} = createStyleContext("PinInput")

export { usePinInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootProps
  extends HTMLChakraProps<"div", ArkPinInput.RootProps>,
    SlotRecipeProps<"PinInput">,
    UnstyledProp {}

export const PinInputRoot = withProvider<HTMLDivElement, PinInputRootProps>(
  ArkPinInput.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputControlProps
  extends HTMLChakraProps<"div", ArkPinInput.ControlProps> {}

export const PinInputControl = withContext<
  HTMLDivElement,
  PinInputControlProps
>(ArkPinInput.Control, "control")

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputInputProps
  extends HTMLChakraProps<"input", ArkPinInput.InputProps> {}

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
