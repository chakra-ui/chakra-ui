import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Foundations / Theme",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ThemeBasic as Basic } from "compositions/examples/theme-basic"
export { ThemeNested as Nested } from "compositions/examples/theme-nested"
export { ThemeWithPortalled as Portalled } from "compositions/examples/theme-with-portalled"
