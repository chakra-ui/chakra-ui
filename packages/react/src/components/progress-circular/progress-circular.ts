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
  useStyles: useCircularProgressStyles,
} = createStyleContext("circularProgress")

export { useCircularProgressStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressRootProps
  extends HTMLChakraProps<"div", ArkProgress.RootBaseProps>,
    SlotRecipeProps<"circularProgress">,
    UnstyledProp {}

export const CircularProgressRoot = withProvider<
  HTMLDivElement,
  CircularProgressRootProps
>(ArkProgress.Root, "root")

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressLabelProps
  extends HTMLChakraProps<"div", ArkProgress.LabelBaseProps> {}

export const CircularProgressLabel = withContext<
  HTMLDivElement,
  CircularProgressLabelProps
>(ArkProgress.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressCircleProps
  extends HTMLChakraProps<"div", ArkProgress.TrackBaseProps> {}

export const CircularProgressCircle = withContext<
  HTMLDivElement,
  CircularProgressCircleProps
>(ArkProgress.Circle, "circle", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressTrackProps
  extends HTMLChakraProps<"div", ArkProgress.TrackBaseProps> {}

export const CircularProgressTrack = withContext<
  HTMLDivElement,
  CircularProgressTrackProps
>(ArkProgress.CircleTrack, "circleTrack", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressRangeProps
  extends HTMLChakraProps<"div", ArkProgress.RangeBaseProps> {}

export const CircularProgressRange = withContext<
  HTMLDivElement,
  CircularProgressRangeProps
>(ArkProgress.CircleRange, "circleRange", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressValueTextProps
  extends HTMLChakraProps<"div", ArkProgress.ValueTextBaseProps> {}

export const CircularProgressValueText = withContext<
  HTMLDivElement,
  CircularProgressValueTextProps
>(ArkProgress.ValueText, "valueText", { forwardAsChild: true })
