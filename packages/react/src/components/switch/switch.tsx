"use client"

import { Switch as ArkSwitch } from "@ark-ui/react/switch"
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
  useStyles: useSwitchStyles,
} = createStyleContext("switch")

export { useSwitchStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchRootProps
  extends HTMLChakraProps<"label", ArkSwitch.RootBaseProps>,
    SlotRecipeProps<"switch">,
    UnstyledProp {}

export const SwitchRoot = withProvider<HTMLLabelElement, SwitchRootProps>(
  ArkSwitch.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchLabelProps
  extends HTMLChakraProps<"span", ArkSwitch.LabelBaseProps> {}

export const SwitchLabel = withContext<HTMLSpanElement, SwitchLabelProps>(
  ArkSwitch.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchControlProps
  extends HTMLChakraProps<"span", ArkSwitch.ControlBaseProps> {}

export const SwitchControl = withContext<HTMLSpanElement, SwitchControlProps>(
  ArkSwitch.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SwitchThumbProps
  extends HTMLChakraProps<"span", ArkSwitch.ThumbBaseProps> {}

export const SwitchThumb = withContext<HTMLSpanElement, SwitchThumbProps>(
  ArkSwitch.Thumb,
  "thumb",
  { forwardAsChild: true },
)
