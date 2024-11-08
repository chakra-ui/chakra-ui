import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Color Swatch",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ColorSwatchBasic as Basic } from "compositions/examples/color-swatch-basic"
export { ColorSwatchWithMix as Mixed } from "compositions/examples/color-swatch-mixed"
export { ColorSwatchWithAlpha as WithAlpha } from "compositions/examples/color-swatch-with-alpha"
export { ColorSwatchWithSizes as WithSizes } from "compositions/examples/color-swatch-with-sizes"
export { ColorSwatchWithTransparent as WithTransparent } from "compositions/examples/color-swatch-with-transparent"
