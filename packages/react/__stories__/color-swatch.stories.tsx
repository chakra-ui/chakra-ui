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
export { ColorSwatchMixed as Mixed } from "compositions/examples/color-swatch-mixed"
export { ColorSwatchPalette as Palette } from "compositions/examples/color-swatch-palette"
export { ColorSwatchWithAlpha as WithAlpha } from "compositions/examples/color-swatch-with-alpha"
export { ColorSwatchWithBadge as WithBadge } from "compositions/examples/color-swatch-with-badge"
export { ColorSwatchWithSizes as WithSizes } from "compositions/examples/color-swatch-with-sizes"
export { ColorSwatchWithTransparent as WithTransparent } from "compositions/examples/color-swatch-with-transparent"
