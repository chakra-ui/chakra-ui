import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Icon Button",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { IconButtonBasic as Basic } from "compositions/examples/icon-button-basic"
export { IconButtonRounded as Rounded } from "compositions/examples/icon-button-rounded"
export { IconButtonWithColors as Colors } from "compositions/examples/icon-button-with-colors"
export { IconButtonWithSizes as Sizes } from "compositions/examples/icon-button-with-sizes"
export { IconButtonWithVariants as Variants } from "compositions/examples/icon-button-with-variants"
