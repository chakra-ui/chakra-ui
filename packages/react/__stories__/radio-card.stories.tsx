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
export { RadioCardCentered as Centered } from "compositions/examples/radio-card-centered"
export { RadioCardComposition as Composition } from "compositions/examples/radio-card-composition"
export { RadioCardWithAddon as Addon } from "compositions/examples/radio-card-with-addon"
export { RadioCardWithColors as Colors } from "compositions/examples/radio-card-with-colors"
export { RadioCardWithCustomIndicator as CustomIndicator } from "compositions/examples/radio-card-with-custom-indicator"
export { RadioCardWithIcon as Icon } from "compositions/examples/radio-card-with-icon"
export { RadioCardWithSizes as Sizes } from "compositions/examples/radio-card-with-sizes"
export { RadioCardWithVariants as Variants } from "compositions/examples/radio-card-with-variants"
export { RadioCardWithoutIndicator as WithoutIndicator } from "compositions/examples/radio-card-without-indicator"
export { RadioCardWithoutIndicatorVertical as WithoutIndicatorVertical } from "compositions/examples/radio-card-without-indicator-vertical"
