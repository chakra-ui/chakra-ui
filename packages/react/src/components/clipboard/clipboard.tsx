"use client"

import type { Assign } from "@ark-ui/react"
import { Clipboard as ArkClipboard } from "@ark-ui/react/clipboard"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { CheckIcon, CopyIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useClipboardStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "clipboard" })

export { useClipboardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardRootProviderBaseProps
  extends Assign<
      ArkClipboard.RootProviderBaseProps,
      SlotRecipeProps<"clipboard">
    >,
    UnstyledProp {}

export interface ClipboardRootProviderProps
  extends HTMLChakraProps<"div", ClipboardRootProviderBaseProps> {}

export const ClipboardRootProvider = withProvider<
  HTMLDivElement,
  ClipboardRootProviderProps
>(ArkClipboard.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardRootBaseProps
  extends Assign<ArkClipboard.RootBaseProps, SlotRecipeProps<"clipboard">>,
    UnstyledProp {}

export interface ClipboardRootProps
  extends HTMLChakraProps<"div", ClipboardRootBaseProps> {}

export const ClipboardRoot = withProvider<HTMLDivElement, ClipboardRootProps>(
  ArkClipboard.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const ClipboardPropsProvider =
  PropsProvider as React.Provider<ClipboardRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardTriggerProps
  extends HTMLChakraProps<"button", ArkClipboard.TriggerProps>,
    UnstyledProp {}

export const ClipboardTrigger = withContext<
  HTMLButtonElement,
  ClipboardTriggerProps
>(ArkClipboard.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardControlProps
  extends HTMLChakraProps<"div", ArkClipboard.ControlProps>,
    UnstyledProp {}

export const ClipboardControl = withContext<
  HTMLDivElement,
  ClipboardControlProps
>(ArkClipboard.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardIndicatorProps
  extends HTMLChakraProps<"div", ArkClipboard.IndicatorProps>,
    UnstyledProp {}

export const ClipboardIndicator = withContext<
  HTMLDivElement,
  ClipboardIndicatorProps
>(ArkClipboard.Indicator, "indicator", {
  forwardAsChild: true,
  defaultProps: {
    copied: <CheckIcon boxSize="1em" />,
    children: <CopyIcon boxSize="1em" />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardInputProps
  extends HTMLChakraProps<"input", ArkClipboard.InputProps>,
    UnstyledProp {}

export const ClipboardInput = withContext<
  HTMLInputElement,
  ClipboardInputProps
>(ArkClipboard.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardLabelProps
  extends HTMLChakraProps<"label", ArkClipboard.LabelProps>,
    UnstyledProp {}

export const ClipboardLabel = withContext<
  HTMLLabelElement,
  ClipboardLabelProps
>(ArkClipboard.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ClipboardContext = ArkClipboard.Context

export interface ClipboardCopyStatusDetails
  extends ArkClipboard.CopyStatusDetails {}

////////////////////////////////////////////////////////////////////////////////////

export interface ClipboardValueTextProps
  extends HTMLChakraProps<"div", ArkClipboard.ValueTextProps>,
    UnstyledProp {}

export const ClipboardValueText = withContext<
  HTMLDivElement,
  ClipboardValueTextProps
>(ArkClipboard.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ClipboardCopyText = forwardRef<
  HTMLDivElement,
  ClipboardIndicatorProps
>(function ClipboardCopyText(props, ref) {
  return (
    <ClipboardIndicator copied="Copied" {...props} ref={ref}>
      Copy
    </ClipboardIndicator>
  )
})
