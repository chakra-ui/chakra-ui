import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Radiomark",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RadiomarkBasic as Basic } from "compositions/examples/radiomark-basic"
export { RadiomarkVariants as Variants } from "compositions/examples/radiomark-variants"
