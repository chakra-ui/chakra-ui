import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Mark",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { MarkBasic as Basic } from "compositions/examples/mark-basic"
export { MarkWithVariants as Variants } from "compositions/examples/mark-with-variants"
