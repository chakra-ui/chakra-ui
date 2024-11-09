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
export { ColorPickerControlled as Controlled } from "compositions/examples/color-picker-controlled"
export { ColorPickerSwatchOnly as SwatchOnly } from "compositions/examples/color-picker-swatch-only"
export { ColorPickerWithDisabled as Disabled } from "compositions/examples/color-picker-with-disabled"
export { ColorPickerTriggerOnly as TriggerOnly } from "compositions/examples/color-picker-trigger-only"
