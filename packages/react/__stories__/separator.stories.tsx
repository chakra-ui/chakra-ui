import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Separator",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SeparatorBasic as Basic } from "compositions/examples/separator-basic"
export { SeparatorWithVariants as Variants } from "compositions/examples/separator-with-variants"
export { SeparatorWithSizes as Sizes } from "compositions/examples/separator-with-sizes"
export { SeparatorWithLabel as Label } from "compositions/examples/separator-with-label"
export { SeparatorVertical as Vertical } from "compositions/examples/separator-vertical"
