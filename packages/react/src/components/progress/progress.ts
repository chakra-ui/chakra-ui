"use client"

import type { Assign } from "@ark-ui/react"
import { Progress as ArkProgress } from "@ark-ui/react/progress"
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
  useStyles: useProgressStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "progress" })

export { useProgressStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressRootProviderBaseProps
  extends Assign<
      ArkProgress.RootProviderBaseProps,
      SlotRecipeProps<"progress">
    >,
    UnstyledProp {}

export interface ProgressRootProviderProps
  extends HTMLChakraProps<"div", ProgressRootProviderBaseProps> {}

export const ProgressRootProvider = withProvider<
  HTMLDivElement,
  ProgressRootProviderProps
>(ArkProgress.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressRootBaseProps
  extends Assign<ArkProgress.RootBaseProps, SlotRecipeProps<"progress">>,
    UnstyledProp {}

export interface ProgressRootProps
  extends HTMLChakraProps<"div", ProgressRootBaseProps> {}

export const ProgressRoot = withProvider<HTMLDivElement, ProgressRootProps>(
  ArkProgress.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export const ProgressPropsProvider =
  PropsProvider as React.Provider<ProgressRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressLabelProps
  extends HTMLChakraProps<"div", ArkProgress.LabelBaseProps> {}

export const ProgressLabel = withContext<HTMLDivElement, ProgressLabelProps>(
  ArkProgress.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressTrackProps
  extends HTMLChakraProps<"div", ArkProgress.TrackBaseProps> {}

export const ProgressTrack = withContext<HTMLDivElement, ProgressTrackProps>(
  ArkProgress.Track,
  "track",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressRangeProps
  extends HTMLChakraProps<"div", ArkProgress.RangeBaseProps> {}

export const ProgressRange = withContext<HTMLDivElement, ProgressRangeProps>(
  ArkProgress.Range,
  "range",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressValueTextProps
  extends HTMLChakraProps<"div", ArkProgress.ValueTextBaseProps> {}

export const ProgressValueText = withContext<
  HTMLDivElement,
  ProgressValueTextProps
>(ArkProgress.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ProgressContext = ArkProgress.Context
