import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Color Picker",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ColorPickerBasic as Basic } from "compositions/examples/color-picker-basic"
export { ColorPickerChangeEnd as ChangeEnd } from "compositions/examples/color-picker-change-end"
export { ColorPickerChannelSliderOnly as ChannelSliderOnly } from "compositions/examples/color-picker-channel-slider-only"
export { ColorPickerControlled as Controlled } from "compositions/examples/color-picker-controlled"
export { ColorPickerWithHookForm as HookForm } from "compositions/examples/color-picker-with-hook-form"
export { ColorPickerInline as Inline } from "compositions/examples/color-picker-inline"
export { ColorPickerInputOnly as InputOnly } from "compositions/examples/color-picker-input-only"
export { ColorPickerSwatchOnly as SwatchOnly } from "compositions/examples/color-picker-swatch-only"
export { ColorPickerTriggerOnly as TriggerOnly } from "compositions/examples/color-picker-trigger-only"
export { ColorPickerWithChannelInput as ChannelInput } from "compositions/examples/color-picker-with-channel-input"
export { ColorPickerWithDisabled as Disabled } from "compositions/examples/color-picker-with-disabled"
export { ColorPickerWithFitContent as FitContent } from "compositions/examples/color-picker-with-fit-content"
export { ColorPickerWithFormat as Format } from "compositions/examples/color-picker-with-format"
export { ColorPickerWithReadonly as Readonly } from "compositions/examples/color-picker-with-readonly"
export { ColorPickerWithSaveSwatch as SaveSwatch } from "compositions/examples/color-picker-with-save-swatch"
export { ColorPickerWithSizes as Sizes } from "compositions/examples/color-picker-with-sizes"
export { ColorPickerWithSwatchAndInput as SwatchAndInput } from "compositions/examples/color-picker-with-swatch-and-input"
export { ColorPickerWithSwatches as Swatches } from "compositions/examples/color-picker-with-swatches"
export { ColorPickerWithSwatchesAndTrigger as SwatchesAndTrigger } from "compositions/examples/color-picker-with-swatches-and-trigger"
export { ColorPickerWithTriggerInInput as TriggerInInput } from "compositions/examples/color-picker-with-trigger-in-input"
export { ColorPickerWithVariants as Variants } from "compositions/examples/color-picker-with-variants"
