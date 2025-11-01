"use client"

import type { Assign } from "@ark-ui/react"
import { Splitter as ArkSplitter } from "@ark-ui/react/splitter"
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
  useStyles: useSplitterStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "splitter" })

export { useSplitterStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterRootProviderBaseProps
  extends Assign<
      ArkSplitter.RootProviderBaseProps,
      SlotRecipeProps<"splitter">
    >,
    UnstyledProp {}

export interface SplitterRootProviderProps
  extends HTMLChakraProps<"div", SplitterRootProviderBaseProps> {}

export const SplitterRootProvider = withProvider<
  HTMLDivElement,
  SplitterRootProviderProps
>(ArkSplitter.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterRootBaseProps
  extends Assign<ArkSplitter.RootBaseProps, SlotRecipeProps<"splitter">>,
    UnstyledProp {}

export interface SplitterRootProps
  extends HTMLChakraProps<"div", SplitterRootBaseProps> {}

export const SplitterRoot = withProvider<HTMLDivElement, SplitterRootProps>(
  ArkSplitter.Root,
  "root",
  { forwardAsChild: true },
)

export const SplitterPropsProvider =
  PropsProvider as React.Provider<SplitterRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterPanelProps
  extends HTMLChakraProps<"div", ArkSplitter.PanelBaseProps>,
    UnstyledProp {}

export const SplitterPanel = withContext<HTMLDivElement, SplitterPanelProps>(
  ArkSplitter.Panel,
  "panel",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterResizeTriggerProps
  extends HTMLChakraProps<"button", ArkSplitter.ResizeTriggerBaseProps>,
    UnstyledProp {}

export const SplitterResizeTrigger = withContext<
  HTMLButtonElement,
  SplitterResizeTriggerProps
>(ArkSplitter.ResizeTrigger, "resizeTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const SplitterContext = ArkSplitter.Context

export interface SplitterResizeDetails extends ArkSplitter.ResizeDetails {}
export interface SplitterResizeEndDetails
  extends ArkSplitter.ResizeEndDetails {}
export interface SplitterExpandCollapseDetails
  extends ArkSplitter.ExpandCollapseDetails {}
export interface SplitterPanelData extends ArkSplitter.PanelData {}
