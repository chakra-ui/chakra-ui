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
  extends Assign<ArkSlider.RootProviderBaseProps, SlotRecipeProps<"slider">>,
    UnstyledProp {}

export interface SliderRootProviderProps
  extends HTMLChakraProps<"div", SliderRootProviderBaseProps> {}

export const SliderRootProvider = withProvider<
  HTMLDivElement,
  SliderRootProviderProps
>(ArkSlider.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface SliderRootBaseProps
  extends Assign<ArkSlider.RootBaseProps, SlotRecipeProps<"slider">>,
    UnstyledProp {}

export interface SliderRootProps
  extends HTMLChakraProps<"div", SliderRootBaseProps> {}

export const SliderRoot = withProvider<HTMLDivElement, SliderRootProps>(
  ArkSlider.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const SliderPropsProvider =
  PropsProvider as React.Provider<SliderRootBaseProps>

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

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarkerIndicatorProps extends HTMLChakraProps<"div"> {}

export const SliderMarkerIndicator = withContext<
  HTMLDivElement,
  SliderMarkerIndicatorProps
>("div", "markerIndicator")

////////////////////////////////////////////////////////////////////////////////////

export interface SliderDraggingIndicatorProps
  extends HTMLChakraProps<"div", ArkSlider.DraggingIndicatorBaseProps> {}

export const SliderDraggingIndicator = withContext<
  HTMLDivElement,
  SliderDraggingIndicatorProps
>(ArkSlider.DraggingIndicator, "draggingIndicator", { forwardAsChild: true })

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

////////////////////////////////////////////////////////////////////////////////////

export interface SliderMarksProps extends SliderMarkerGroupProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
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
              {label != null && (
                <span className="chakra-slider__marker-label">{label}</span>
              )}
            </SliderMarker>
          )
        })}
      </SliderMarkerGroup>
    )
  },
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

export const SliderContext = ArkSlider.Context
export const SliderHiddenInput = ArkSlider.HiddenInput

export interface SliderValueChangeDetails
  extends ArkSlider.ValueChangeDetails {}
