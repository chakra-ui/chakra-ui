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
  extends HTMLChakraProps<"svg", ArkProgress.CircleBaseProps> {}

export const CircularProgressCircle = withContext<
  SVGSVGElement,
  CircularProgressCircleProps
>(ArkProgress.Circle, "circle", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressTrackProps
  extends HTMLChakraProps<"circle", ArkProgress.TrackBaseProps> {}

export const CircularProgressTrack = withContext<
  SVGCircleElement,
  CircularProgressTrackProps
>(ArkProgress.CircleTrack, "circleTrack", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressRangeProps
  extends HTMLChakraProps<"circle", ArkProgress.RangeBaseProps> {}

export const CircularProgressRange = withContext<
  SVGCircleElement,
  CircularProgressRangeProps
>(ArkProgress.CircleRange, "circleRange", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CircularProgressValueTextProps
  extends HTMLChakraProps<"div", ArkProgress.ValueTextBaseProps> {}

export const CircularProgressValueText = withContext<
  HTMLDivElement,
  CircularProgressValueTextProps
>(ArkProgress.ValueText, "valueText", { forwardAsChild: true })
