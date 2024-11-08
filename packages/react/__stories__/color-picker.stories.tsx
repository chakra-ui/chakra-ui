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
