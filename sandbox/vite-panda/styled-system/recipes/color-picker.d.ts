/* eslint-disable */
import type { ConditionalValue } from "../types/index"
import type { DistributiveOmit, Pretty } from "../types/system-types"

interface ColorPickerVariant {
  /**
   * @default "md"
   */
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /**
   * @default "outline"
   */
  variant: "outline" | "subtle"
}

type ColorPickerVariantMap = {
  [key in keyof ColorPickerVariant]: Array<ColorPickerVariant[key]>
}

type ColorPickerSlot =
  | "root"
  | "label"
  | "control"
  | "trigger"
  | "positioner"
  | "content"
  | "area"
  | "areaThumb"
  | "valueText"
  | "areaBackground"
  | "channelSlider"
  | "channelSliderLabel"
  | "channelSliderTrack"
  | "channelSliderThumb"
  | "channelSliderValueText"
  | "channelInput"
  | "transparencyGrid"
  | "swatchGroup"
  | "swatchTrigger"
  | "swatchIndicator"
  | "swatch"
  | "eyeDropperTrigger"
  | "formatTrigger"
  | "formatSelect"
  | "view"
  | "channelText"

export type ColorPickerVariantProps = {
  [key in keyof ColorPickerVariant]?:
    | ConditionalValue<ColorPickerVariant[key]>
    | undefined
}

export interface ColorPickerRecipe {
  __slot: ColorPickerSlot
  __type: ColorPickerVariantProps;
  (props?: ColorPickerVariantProps): Pretty<Record<ColorPickerSlot, string>>
  raw: (props?: ColorPickerVariantProps) => ColorPickerVariantProps
  variantMap: ColorPickerVariantMap
  variantKeys: Array<keyof ColorPickerVariant>
  splitVariantProps<Props extends ColorPickerVariantProps>(
    props: Props,
  ): [
    ColorPickerVariantProps,
    Pretty<DistributiveOmit<Props, keyof ColorPickerVariantProps>>,
  ]
  getVariantProps: (props?: ColorPickerVariantProps) => ColorPickerVariantProps
}

export declare const colorPicker: ColorPickerRecipe
