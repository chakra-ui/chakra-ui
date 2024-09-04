import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Status",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { StatusBasic as Basic } from "compositions/examples/status-basic"
export { StatusWithLabel as Label } from "compositions/examples/status-with-label"
export { StatusSizeTable as Sizes } from "compositions/examples/status-size-table"
