import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Radio Card",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RadioCardBasic as Basic } from "compositions/examples/radio-card-basic"
export { RadioCardWithSizes as Sizes } from "compositions/examples/radio-card-with-sizes"
export { RadioCardWithColors as Colors } from "compositions/examples/radio-card-with-colors"
export { RadioCardWithIcon as Icon } from "compositions/examples/radio-card-with-icon"
export { RadioCardCentered as Centered } from "compositions/examples/radio-card-centered"
export { RadioCardWithVariants as Variants } from "compositions/examples/radio-card-with-variants"
