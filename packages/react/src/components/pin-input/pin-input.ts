"use client"

import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input"
import type { Assign } from "@chakra-ui/utils"
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
} = createSlotRecipeContext({ key: "pinInput" })

export { usePinInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PinInputRootBaseProps
  extends Assign<ArkPinInput.RootBaseProps, SlotRecipeProps<"pinInput">>,
    UnstyledProp {}

export interface PinInputRootProps
  extends HTMLChakraProps<"div", PinInputRootBaseProps> {}

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
