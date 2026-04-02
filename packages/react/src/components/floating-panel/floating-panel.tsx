"use client"

import type { Assign } from "@ark-ui/react"
import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/react/floating-panel"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withRootProvider,
  withContext,
  useStyles: useFloatingPanelStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "floatingPanel" })

export { useFloatingPanelStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelRootProviderBaseProps
  extends
    Assign<
      ArkFloatingPanel.RootProviderProps,
      SlotRecipeProps<"floatingPanel">
    >,
    UnstyledProp {}

export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {
  children: React.ReactNode
}

export const FloatingPanelRootProvider =
  withRootProvider<FloatingPanelRootProviderProps>(
    ArkFloatingPanel.RootProvider,
  )

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelRootBaseProps
  extends
    Assign<ArkFloatingPanel.RootProps, SlotRecipeProps<"floatingPanel">>,
    UnstyledProp {}

export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
  children: React.ReactNode
}

export const FloatingPanelRoot = withRootProvider<FloatingPanelRootProps>(
  ArkFloatingPanel.Root,
)

////////////////////////////////////////////////////////////////////////////////////

export const FloatingPanelPropsProvider =
  PropsProvider as React.Provider<FloatingPanelRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelTriggerProps
  extends
    HTMLChakraProps<"button", ArkFloatingPanel.TriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelTrigger = withContext<
  HTMLButtonElement,
  FloatingPanelTriggerProps
>(ArkFloatingPanel.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelPositionerProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.PositionerBaseProps>,
    UnstyledProp {}

export const FloatingPanelPositioner = withContext<
  HTMLDivElement,
  FloatingPanelPositionerProps
>(ArkFloatingPanel.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelContentProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.ContentBaseProps>,
    UnstyledProp {}

export const FloatingPanelContent = withContext<
  HTMLDivElement,
  FloatingPanelContentProps
>(ArkFloatingPanel.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelHeaderProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.HeaderBaseProps>,
    UnstyledProp {}

export const FloatingPanelHeader = withContext<
  HTMLDivElement,
  FloatingPanelHeaderProps
>(ArkFloatingPanel.Header, "header", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelBodyProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.BodyBaseProps>,
    UnstyledProp {}

export const FloatingPanelBody = withContext<
  HTMLDivElement,
  FloatingPanelBodyProps
>(ArkFloatingPanel.Body, "body", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelTitleProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.TitleBaseProps>,
    UnstyledProp {}

export const FloatingPanelTitle = withContext<
  HTMLDivElement,
  FloatingPanelTitleProps
>(ArkFloatingPanel.Title, "title", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelDragTriggerProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.DragTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelDragTrigger = withContext<
  HTMLDivElement,
  FloatingPanelDragTriggerProps
>(ArkFloatingPanel.DragTrigger, "dragTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelResizeTriggerProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.ResizeTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelResizeTrigger = withContext<
  HTMLDivElement,
  FloatingPanelResizeTriggerProps
>(ArkFloatingPanel.ResizeTrigger, "resizeTrigger", { forwardAsChild: true })

const RESIZE_AXES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const

export const FloatingPanelResizeTriggers = () => (
  <>
    {RESIZE_AXES.map((axis) => (
      <FloatingPanelResizeTrigger key={axis} axis={axis} />
    ))}
  </>
)

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelStageTriggerProps
  extends
    HTMLChakraProps<"button", ArkFloatingPanel.StageTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelStageTrigger = withContext<
  HTMLButtonElement,
  FloatingPanelStageTriggerProps
>(ArkFloatingPanel.StageTrigger, "stageTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelCloseTriggerProps
  extends
    HTMLChakraProps<"button", ArkFloatingPanel.CloseTriggerBaseProps>,
    UnstyledProp {}

export const FloatingPanelCloseTrigger = withContext<
  HTMLButtonElement,
  FloatingPanelCloseTriggerProps
>(ArkFloatingPanel.CloseTrigger, "closeTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FloatingPanelControlProps
  extends
    HTMLChakraProps<"div", ArkFloatingPanel.ControlBaseProps>,
    UnstyledProp {}

export const FloatingPanelControl = withContext<
  HTMLDivElement,
  FloatingPanelControlProps
>(ArkFloatingPanel.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const FloatingPanelContext = ArkFloatingPanel.Context

export type { FloatingPanelOpenChangeDetails } from "@ark-ui/react/floating-panel"
export type { FloatingPanelPositionChangeDetails } from "@ark-ui/react/floating-panel"
export type { FloatingPanelSizeChangeDetails } from "@ark-ui/react/floating-panel"
export type { FloatingPanelStageChangeDetails } from "@ark-ui/react/floating-panel"
