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
  extends
    Assign<ArkSplitter.RootProviderBaseProps, SlotRecipeProps<"splitter">>,
    UnstyledProp {}

export interface SplitterRootProviderProps extends HTMLChakraProps<
  "div",
  SplitterRootProviderBaseProps
> {}

export const SplitterRootProvider = withProvider<
  HTMLDivElement,
  SplitterRootProviderProps
>(ArkSplitter.RootProvider, "root", { forwardAsChild: true })
SplitterRootProvider.displayName = "SplitterRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterRootBaseProps
  extends
    Assign<ArkSplitter.RootBaseProps, SlotRecipeProps<"splitter">>,
    UnstyledProp {}

export interface SplitterRootProps extends HTMLChakraProps<
  "div",
  SplitterRootBaseProps
> {}

export const SplitterRoot = withProvider<HTMLDivElement, SplitterRootProps>(
  ArkSplitter.Root,
  "root",
  {
    forwardAsChild: true,
  },
)
SplitterRoot.displayName = "SplitterRoot"

export const SplitterPropsProvider =
  PropsProvider as React.Provider<SplitterRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterPanelProps
  extends HTMLChakraProps<"div", ArkSplitter.PanelBaseProps>, UnstyledProp {}

export const SplitterPanel = withContext<HTMLDivElement, SplitterPanelProps>(
  ArkSplitter.Panel,
  "panel",
  { forwardAsChild: true },
)
SplitterPanel.displayName = "SplitterPanel"

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterResizeTriggerSeparatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const SplitterResizeTriggerSeparator = withContext<
  HTMLDivElement,
  SplitterResizeTriggerSeparatorProps
>("div", "resizeTriggerSeparator")
SplitterResizeTriggerSeparator.displayName = "SplitterResizeTriggerSeparator"

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterResizeTriggerIndicatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const SplitterResizeTriggerIndicator = withContext<
  HTMLDivElement,
  SplitterResizeTriggerIndicatorProps
>(ArkSplitter.ResizeTriggerIndicator, "resizeTriggerIndicator")
SplitterResizeTriggerIndicator.displayName = "SplitterResizeTriggerIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface SplitterResizeTriggerProps
  extends
    HTMLChakraProps<"button", ArkSplitter.ResizeTriggerBaseProps>,
    UnstyledProp {}

export const SplitterResizeTrigger = withContext<
  HTMLButtonElement,
  SplitterResizeTriggerProps
>(ArkSplitter.ResizeTrigger, "resizeTrigger", {
  forwardAsChild: true,
  defaultProps: {
    "aria-label": "Resize",
    children: (
      <>
        <SplitterResizeTriggerSeparator />
        <SplitterResizeTriggerIndicator />
      </>
    ),
  },
})
SplitterResizeTrigger.displayName = "SplitterResizeTrigger"

////////////////////////////////////////////////////////////////////////////////////

export const SplitterContext = ArkSplitter.Context

export interface SplitterResizeDetails extends ArkSplitter.ResizeDetails {}
export interface SplitterResizeEndDetails
  extends ArkSplitter.ResizeEndDetails {}
export interface SplitterExpandCollapseDetails
  extends ArkSplitter.ExpandCollapseDetails {}
export interface SplitterPanelData extends ArkSplitter.PanelData {}
