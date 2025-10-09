import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Date Picker",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DatePickerBasic as Basic } from "compositions/examples/date-picker-basic"
