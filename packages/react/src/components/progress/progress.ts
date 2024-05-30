"use client"

import { Progress as ArkProgress } from "@ark-ui/react/progress"
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
  useStyles: useProgressStyles,
} = createStyleContext("Progress")

export { useProgressStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressRootProps
  extends HTMLChakraProps<"div", ArkProgress.RootProps>,
    SlotRecipeProps<"Progress">,
    UnstyledProp {}

export const ProgressRoot = withProvider<HTMLDivElement, ProgressRootProps>(
  ArkProgress.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressLabelProps
  extends HTMLChakraProps<"div", ArkProgress.LabelProps> {}

export const ProgressLabel = withContext<HTMLDivElement, ProgressLabelProps>(
  ArkProgress.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressTrackProps
  extends HTMLChakraProps<"div", ArkProgress.TrackProps> {}

export const ProgressTrack = withContext<HTMLDivElement, ProgressTrackProps>(
  ArkProgress.Track,
  "track",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressRangeProps
  extends HTMLChakraProps<"div", ArkProgress.RangeProps> {}

export const ProgressRange = withContext<HTMLDivElement, ProgressRangeProps>(
  ArkProgress.Range,
  "range",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ProgressValueTextProps
  extends HTMLChakraProps<"div", ArkProgress.ValueTextProps> {}

export const ProgressValueText = withContext<
  HTMLDivElement,
  ProgressValueTextProps
>(ArkProgress.ValueText, "valueText", { forwardAsChild: true })
