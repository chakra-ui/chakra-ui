"use client"

import type { Assign } from "@ark-ui/react"
import { Slider as ArkSlider, useSliderContext } from "@ark-ui/react/slider"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { For } from "../for"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useSliderStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "slider" })

export { useSliderStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRootProviderBaseProps
  extends
    Assign<ArkSlider.RootProviderBaseProps, SlotRecipeProps<"slider">>,
    UnstyledProp {}

export interface SliderRootProviderProps extends HTMLChakraProps<
  "div",
  SliderRootProviderBaseProps
> {}

export const SliderRootProvider = withProvider<
  HTMLDivElement,
  SliderRootProviderProps
>(ArkSlider.RootProvider, "root", { forwardAsChild: true })
SliderRootProvider.displayName = "SliderRootProvider"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRootBaseProps
  extends
    Assign<ArkSlider.RootBaseProps, SlotRecipeProps<"slider">>,
    UnstyledProp {}

export interface SliderRootProps extends HTMLChakraProps<
  "div",
  SliderRootBaseProps
> {}

export const SliderRoot = withProvider<HTMLDivElement, SliderRootProps>(
  ArkSlider.Root,
  "root",
  { forwardAsChild: true },
)
SliderRoot.displayName = "SliderRoot"

////////////////////////////////////////////////////////////////////////////////////

export const SliderPropsProvider =
  PropsProvider as React.Provider<SliderRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SliderTrackProps
  extends HTMLChakraProps<"div", ArkSlider.TrackBaseProps>, UnstyledProp {}

export const SliderTrack = withContext<HTMLDivElement, SliderTrackProps>(
  ArkSlider.Track,
  "track",
  { forwardAsChild: true },
)
SliderTrack.displayName = "SliderTrack"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRangeProps
  extends HTMLChakraProps<"div", ArkSlider.RangeBaseProps>, UnstyledProp {}

export const SliderRange = withContext<HTMLDivElement, SliderRangeProps>(
  ArkSlider.Range,
  "range",
  { forwardAsChild: true },
)
SliderRange.displayName = "SliderRange"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderThumbProps
  extends HTMLChakraProps<"div", ArkSlider.ThumbBaseProps>, UnstyledProp {}

export const SliderThumb = withContext<HTMLDivElement, SliderThumbProps>(
  ArkSlider.Thumb,
  "thumb",
  { forwardAsChild: true },
)
SliderThumb.displayName = "SliderThumb"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderValueTextProps
  extends HTMLChakraProps<"div", ArkSlider.ValueTextBaseProps>, UnstyledProp {}

export const SliderValueText = withContext<
  HTMLDivElement,
  SliderValueTextProps
>(ArkSlider.ValueText, "valueText", { forwardAsChild: true })
SliderValueText.displayName = "SliderValueText"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderLabelProps
  extends HTMLChakraProps<"label", ArkSlider.LabelBaseProps>, UnstyledProp {}

export const SliderLabel = withContext<HTMLLabelElement, SliderLabelProps>(
  ArkSlider.Label,
  "label",
  { forwardAsChild: true },
)
SliderLabel.displayName = "SliderLabel"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerGroupProps
  extends
    HTMLChakraProps<"div", ArkSlider.MarkerGroupBaseProps>,
    UnstyledProp {}

export const SliderMarkerGroup = withContext<
  HTMLDivElement,
  SliderMarkerGroupProps
>(ArkSlider.MarkerGroup, "markerGroup", { forwardAsChild: true })
SliderMarkerGroup.displayName = "SliderMarkerGroup"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerProps
  extends HTMLChakraProps<"div", ArkSlider.MarkerBaseProps>, UnstyledProp {}

export const SliderMarker = withContext<HTMLDivElement, SliderMarkerProps>(
  ArkSlider.Marker,
  "marker",
  { forwardAsChild: true },
)
SliderMarker.displayName = "SliderMarker"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerIndicatorProps
  extends HTMLChakraProps<"div">, UnstyledProp {}

export const SliderMarkerIndicator = withContext<
  HTMLDivElement,
  SliderMarkerIndicatorProps
>("div", "markerIndicator")
SliderMarkerIndicator.displayName = "SliderMarkerIndicator"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerLabelProps
  extends HTMLChakraProps<"span">, UnstyledProp {}

export const SliderMarkerLabel = withContext<
  HTMLSpanElement,
  SliderMarkerLabelProps
>("span", "markerLabel")
SliderMarkerLabel.displayName = "SliderMarkerLabel"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderDraggingIndicatorProps
  extends
    HTMLChakraProps<"div", ArkSlider.DraggingIndicatorBaseProps>,
    UnstyledProp {}

export const SliderDraggingIndicator = withContext<
  HTMLDivElement,
  SliderDraggingIndicatorProps
>(ArkSlider.DraggingIndicator, "draggingIndicator", { forwardAsChild: true })
SliderDraggingIndicator.displayName = "SliderDraggingIndicator"

////////////////////////////////////////////////////////////////////////////////////

export const SliderThumbs = (props: Omit<SliderThumbProps, "index">) => {
  const api = useSliderContext()
  return (
    <For each={api.value}>
      {(_, index) => (
        <SliderThumb key={index} index={index} {...props}>
          <SliderHiddenInput />
        </SliderThumb>
      )}
    </For>
  )
}
SliderThumbs.displayName = "SliderThumbs"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarksProps extends SliderMarkerGroupProps {
  marks?: Array<number | { value: number; label: React.ReactNode }> | undefined
}

export const SliderMarks = forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks, ...rest } = props
    if (!marks?.length) return null

    return (
      <SliderMarkerGroup ref={ref} {...rest}>
        {marks.map((mark, index) => {
          const value = typeof mark === "number" ? mark : mark.value
          const label = typeof mark === "number" ? undefined : mark.label
          return (
            <SliderMarker key={index} value={value}>
              <SliderMarkerIndicator />
              {label != null && <SliderMarkerLabel>{label}</SliderMarkerLabel>}
            </SliderMarker>
          )
        })}
      </SliderMarkerGroup>
    )
  },
)
SliderMarks.displayName = "SliderMarks"

////////////////////////////////////////////////////////////////////////////////////

export interface SliderControlProps
  extends HTMLChakraProps<"div", ArkSlider.ControlBaseProps>, UnstyledProp {}

export const SliderControl = withContext<HTMLDivElement, SliderControlProps>(
  ArkSlider.Control,
  "control",
  { forwardAsChild: true },
)
SliderControl.displayName = "SliderControl"

////////////////////////////////////////////////////////////////////////////////////

export const SliderContext = ArkSlider.Context
export const SliderHiddenInput = ArkSlider.HiddenInput
SliderHiddenInput.displayName = "SliderHiddenInput"

export interface SliderValueChangeDetails
  extends ArkSlider.ValueChangeDetails {}
