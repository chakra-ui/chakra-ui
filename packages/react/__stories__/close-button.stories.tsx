import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Close Button",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CloseButtonBasic as Basic } from "compositions/examples/close-button-basic"
export { CloseButtonWithSizes as Sizes } from "compositions/examples/close-button-with-sizes"
export { CloseButtonWithVariants as Variants } from "compositions/examples/close-button-with-variants"
export { CloseButtonWithCustomIcon as CustomIcon } from "compositions/examples/close-button-with-custom-icon"
