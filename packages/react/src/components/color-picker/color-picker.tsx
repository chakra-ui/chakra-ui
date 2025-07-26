"use client"

import type { Assign } from "@ark-ui/react"
import {
  ColorPicker as ArkColorPicker,
  useColorPickerContext,
} from "@ark-ui/react/color-picker"
import { forwardRef } from "react"
import { mergeProps } from "../../merge-props"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { IconButton, type IconButtonProps } from "../button"
import { PipetteIcon } from "../icons"
import type { StackProps } from "../stack"
import { Stack } from "../stack"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useColorPickerStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "colorPicker" })

export { useColorPickerStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerRootProviderBaseProps
  extends Assign<
      ArkColorPicker.RootProviderBaseProps,
      SlotRecipeProps<"colorPicker">
    >,
    UnstyledProp {}

export interface ColorPickerRootProviderProps
  extends HTMLChakraProps<"div", ColorPickerRootProviderBaseProps> {}

export const ColorPickerRootProvider = withProvider<
  HTMLDivElement,
  ColorPickerRootProviderProps
>(ArkColorPicker.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerRootBaseProps
  extends Assign<ArkColorPicker.RootBaseProps, SlotRecipeProps<"colorPicker">>,
    UnstyledProp {}

export interface ColorPickerRootProps
  extends HTMLChakraProps<"div", ColorPickerRootBaseProps> {}

export const ColorPickerRoot = withProvider<
  HTMLDivElement,
  ColorPickerRootProps
>(ArkColorPicker.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ColorPickerPropsProvider =
  PropsProvider as React.Provider<ColorPickerRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerLabelProps
  extends HTMLChakraProps<"label", ArkColorPicker.LabelBaseProps>,
    UnstyledProp {}

export const ColorPickerLabel = withContext<
  HTMLLabelElement,
  ColorPickerLabelProps
>(ArkColorPicker.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerControlProps
  extends HTMLChakraProps<"div", ArkColorPicker.ControlBaseProps>,
    UnstyledProp {}

export const ColorPickerControl = withContext<
  HTMLDivElement,
  ColorPickerControlProps
>(ArkColorPicker.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerValueSwatchProps
  extends HTMLChakraProps<"div", ArkColorPicker.ValueSwatchBaseProps>,
    UnstyledProp {}

export const ColorPickerValueSwatch = withContext<
  HTMLDivElement,
  ColorPickerValueSwatchProps
>(ArkColorPicker.ValueSwatch, "swatch", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerTriggerProps
  extends HTMLChakraProps<"button", ArkColorPicker.TriggerBaseProps>,
    UnstyledProp {}

export const ColorPickerTrigger = withContext<
  HTMLButtonElement,
  ColorPickerTriggerProps
>(ArkColorPicker.Trigger, "trigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <ColorPickerValueSwatch />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerPositionerProps
  extends HTMLChakraProps<"div", ArkColorPicker.PositionerBaseProps>,
    UnstyledProp {}

export const ColorPickerPositioner = withContext<
  HTMLDivElement,
  ColorPickerPositionerProps
>(ArkColorPicker.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerContentProps
  extends HTMLChakraProps<"div", ArkColorPicker.ContentBaseProps>,
    UnstyledProp {}

export const ColorPickerContent = withContext<
  HTMLDivElement,
  ColorPickerContentProps
>(ArkColorPicker.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerAreaBackgroundProps
  extends HTMLChakraProps<"div", ArkColorPicker.AreaBackgroundBaseProps>,
    UnstyledProp {}

export const ColorPickerAreaBackground = withContext<
  HTMLDivElement,
  ColorPickerAreaBackgroundProps
>(ArkColorPicker.AreaBackground, "areaBackground", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerAreaThumbProps
  extends HTMLChakraProps<"div", ArkColorPicker.AreaThumbBaseProps>,
    UnstyledProp {}

export const ColorPickerAreaThumb = withContext<
  HTMLDivElement,
  ColorPickerAreaThumbProps
>(ArkColorPicker.AreaThumb, "areaThumb", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerAreaProps
  extends HTMLChakraProps<"div", ArkColorPicker.AreaBaseProps>,
    UnstyledProp {}

export const ColorPickerArea = withContext<
  HTMLDivElement,
  ColorPickerAreaProps
>(ArkColorPicker.Area, "area", {
  forwardAsChild: true,
  defaultProps: {
    children: (
      <>
        <ColorPickerAreaBackground />
        <ColorPickerAreaThumb />
      </>
    ),
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelSliderTrackProps
  extends HTMLChakraProps<"div", ArkColorPicker.ChannelSliderTrackBaseProps>,
    UnstyledProp {}

export const ColorPickerChannelSliderTrack = withContext<
  HTMLDivElement,
  ColorPickerChannelSliderTrackProps
>(ArkColorPicker.ChannelSliderTrack, "channelSliderTrack", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelSliderThumbProps
  extends HTMLChakraProps<"div", ArkColorPicker.ChannelSliderThumbBaseProps>,
    UnstyledProp {}

export const ColorPickerChannelSliderThumb = withContext<
  HTMLDivElement,
  ColorPickerChannelSliderThumbProps
>(ArkColorPicker.ChannelSliderThumb, "channelSliderThumb", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerTransparencyGridProps
  extends HTMLChakraProps<"div", ArkColorPicker.TransparencyGridBaseProps>,
    UnstyledProp {}

export const ColorPickerTransparencyGrid = withContext<
  HTMLDivElement,
  ColorPickerTransparencyGridProps
>(ArkColorPicker.TransparencyGrid, "transparencyGrid", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelSliderProps
  extends HTMLChakraProps<"div", ArkColorPicker.ChannelSliderBaseProps>,
    UnstyledProp {}

export const ColorPickerChannelSlider = withContext<
  HTMLDivElement,
  ColorPickerChannelSliderProps
>(ArkColorPicker.ChannelSlider, "channelSlider", {
  forwardAsChild: true,
  defaultProps: {
    children: (
      <>
        <ColorPickerTransparencyGrid size="0.6rem" />
        <ColorPickerChannelSliderTrack />
        <ColorPickerChannelSliderThumb />
      </>
    ),
  },
})

////////////////////////////////////////////////////////////////////////////////////

export const ColorPickerSliders = forwardRef<HTMLDivElement, StackProps>(
  function ColorPickerSliders(props, ref) {
    return (
      <Stack gap="1" flex="1" px="1" ref={ref} {...props}>
        <ColorPickerChannelSlider channel="hue" />
        <ColorPickerChannelSlider channel="alpha" />
      </Stack>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelInputProps
  extends HTMLChakraProps<"input", ArkColorPicker.ChannelInputBaseProps>,
    UnstyledProp {}

export const ColorPickerChannelInput = withContext<
  HTMLInputElement,
  ColorPickerChannelInputProps
>(ArkColorPicker.ChannelInput, "channelInput", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const ColorPickerInput = forwardRef<
  HTMLInputElement,
  Omit<ColorPickerChannelInputProps, "channel">
>(function ColorHexInput(props, ref) {
  return <ColorPickerChannelInput channel="hex" ref={ref} {...props} />
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerSwatchGroupProps
  extends HTMLChakraProps<"div", ArkColorPicker.SwatchGroupBaseProps>,
    UnstyledProp {}

export const ColorPickerSwatchGroup = withContext<
  HTMLDivElement,
  ColorPickerSwatchGroupProps
>(ArkColorPicker.SwatchGroup, "swatchGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerSwatchTriggerProps
  extends HTMLChakraProps<"button", ArkColorPicker.SwatchTriggerBaseProps>,
    UnstyledProp {}

export const ColorPickerSwatchTrigger = withContext<
  HTMLButtonElement,
  ColorPickerSwatchTriggerProps
>(ArkColorPicker.SwatchTrigger, "swatchTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerSwatchProps
  extends HTMLChakraProps<"div", ArkColorPicker.SwatchBaseProps>,
    UnstyledProp {}

export const ColorPickerSwatch = withContext<
  HTMLDivElement,
  ColorPickerSwatchProps
>(ArkColorPicker.Swatch, "swatch", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerSwatchIndicatorProps
  extends HTMLChakraProps<"div", ArkColorPicker.SwatchIndicatorBaseProps>,
    UnstyledProp {}

export const ColorPickerSwatchIndicator = withContext<
  HTMLDivElement,
  ColorPickerSwatchIndicatorProps
>(ArkColorPicker.SwatchIndicator, "swatchIndicator", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerValueTextProps
  extends HTMLChakraProps<"div", ArkColorPicker.ValueTextBaseProps>,
    UnstyledProp {}

export const ColorPickerValueText = withContext<
  HTMLDivElement,
  ColorPickerValueTextProps
>(ArkColorPicker.ValueText, "valueText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerViewProps
  extends HTMLChakraProps<"div", ArkColorPicker.ViewBaseProps>,
    UnstyledProp {}

export const ColorPickerView = withContext<
  HTMLDivElement,
  ColorPickerViewProps
>(ArkColorPicker.View, "view", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerFormatTriggerProps
  extends HTMLChakraProps<"button", ArkColorPicker.FormatTriggerBaseProps>,
    UnstyledProp {}

export const ColorPickerFormatTrigger = withContext<
  HTMLButtonElement,
  ColorPickerFormatTriggerProps
>(ArkColorPicker.FormatTrigger, "formatTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerFormatSelectProps
  extends HTMLChakraProps<"select", ArkColorPicker.FormatSelectBaseProps>,
    UnstyledProp {}

export const ColorPickerFormatSelect = withContext<
  HTMLSelectElement,
  ColorPickerFormatSelectProps
>(ArkColorPicker.FormatSelect, "formatSelect", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerEyeDropperTriggerProps
  extends IconButtonProps,
    UnstyledProp {}

export const ColorPickerEyeDropperTrigger = withContext<
  HTMLButtonElement,
  ColorPickerEyeDropperTriggerProps
>(ArkColorPicker.EyeDropperTrigger, "eyeDropperTrigger", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerEyeDropperProps extends IconButtonProps {}

export const ColorPickerEyeDropper = forwardRef<
  HTMLButtonElement,
  ColorPickerEyeDropperProps
>(function ColorPickerEyeDropper(props, ref) {
  const { children = <PipetteIcon />, ...rest } = props
  const picker = useColorPickerContext()
  const localProps = mergeProps<any>(picker.getEyeDropperTriggerProps(), rest)
  return (
    <IconButton ref={ref} {...localProps}>
      {children}
    </IconButton>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelSliderValueTextProps
  extends HTMLChakraProps<
      "div",
      ArkColorPicker.ChannelSliderValueTextBaseProps
    >,
    UnstyledProp {}

export const ColorPickerChannelSliderValueText = withContext<
  HTMLDivElement,
  ColorPickerChannelSliderValueTextProps
>(ArkColorPicker.ChannelSliderValueText, "channelSliderValueText", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelSliderLabelProps
  extends HTMLChakraProps<"div", ArkColorPicker.ChannelSliderLabelBaseProps>,
    UnstyledProp {}

export const ColorPickerChannelSliderLabel = withContext<
  HTMLDivElement,
  ColorPickerChannelSliderLabelProps
>(ArkColorPicker.ChannelSliderLabel, "channelSliderLabel", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export const ColorPickerHiddenInput = forwardRef<
  HTMLInputElement,
  ArkColorPicker.HiddenInputProps
>(function ColorPickerHiddenInput(props, ref) {
  return <ArkColorPicker.HiddenInput tabIndex={-1} ref={ref} {...props} />
})

export const ColorPickerContext = ArkColorPicker.Context

export interface ColorPickerValueChangeDetails
  extends ArkColorPicker.ValueChangeDetails {}

////////////////////////////////////////////////////////////////////////////////////

export interface ColorPickerChannelTextProps
  extends HTMLChakraProps<"span">,
    UnstyledProp {}

export const ColorPickerChannelText = withContext<
  HTMLSpanElement,
  ColorPickerChannelTextProps
>("span", "channelText", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

const formatMap = {
  rgba: ["red", "green", "blue", "alpha"],
  hsla: ["hue", "saturation", "lightness", "alpha"],
  hsba: ["hue", "saturation", "brightness", "alpha"],
  hexa: ["hex", "alpha"],
} as const

type ColorFormatMap = typeof formatMap

export const getColorChannels = <T extends keyof ColorFormatMap>(
  format: T,
): ColorFormatMap[T] => formatMap[format]
