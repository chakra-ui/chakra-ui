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
export { RadioCardWithColors as WithColors } from "compositions/examples/radio-card-with-colors"
export { RadioCardWithIcon as WithIcon } from "compositions/examples/radio-card-with-icon"
export { RadioCardCentered as Centered } from "compositions/examples/radio-card-centered"
