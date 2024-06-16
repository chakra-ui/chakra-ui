"use client"

import { Slider as ArkSlider } from "@ark-ui/react/slider"
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
  useStyles: useSliderStyles,
} = createStyleContext("slider")

export { useSliderStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRootProps
  extends HTMLChakraProps<"div", ArkSlider.RootBaseProps>,
    SlotRecipeProps<"slider">,
    UnstyledProp {}

export const SliderRoot = withProvider<HTMLDivElement, SliderRootProps>(
  ArkSlider.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderControlProps
  extends HTMLChakraProps<"div", ArkSlider.ControlBaseProps> {}

export const SliderControl = withContext<HTMLDivElement, SliderControlProps>(
  ArkSlider.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderTrackProps
  extends HTMLChakraProps<"div", ArkSlider.TrackBaseProps> {}

export const SliderTrack = withContext<HTMLDivElement, SliderTrackProps>(
  ArkSlider.Track,
  "track",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRangeProps
  extends HTMLChakraProps<"div", ArkSlider.RangeBaseProps> {}

export const SliderRange = withContext<HTMLDivElement, SliderRangeProps>(
  ArkSlider.Range,
  "range",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderThumbProps
  extends HTMLChakraProps<"div", ArkSlider.ThumbBaseProps> {}

export const SliderThumb = withContext<HTMLDivElement, SliderThumbProps>(
  ArkSlider.Thumb,
  "thumb",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderValueTextProps
  extends HTMLChakraProps<"div", ArkSlider.ValueTextBaseProps> {}

export const SliderValueText = withContext<
  HTMLDivElement,
  SliderValueTextProps
>(ArkSlider.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SliderLabelProps
  extends HTMLChakraProps<"label", ArkSlider.LabelBaseProps> {}

export const SliderLabel = withContext<HTMLLabelElement, SliderLabelProps>(
  ArkSlider.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerGroupProps
  extends HTMLChakraProps<"div", ArkSlider.MarkerGroupBaseProps> {}

export const SliderMarkerGroup = withContext<
  HTMLDivElement,
  SliderMarkerGroupProps
>(ArkSlider.MarkerGroup, "markerGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerProps
  extends HTMLChakraProps<"div", ArkSlider.MarkerBaseProps> {}

export const SliderMarker = withContext<HTMLDivElement, SliderMarkerProps>(
  ArkSlider.Marker,
  "marker",
  { forwardAsChild: true },
)
