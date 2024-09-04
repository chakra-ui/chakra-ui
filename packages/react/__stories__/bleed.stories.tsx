import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Bleed",
  decorators: [
    (Story) => (
      <Box p="4">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { BleedBasic as Basic } from "compositions/examples/bleed-basic"
export { BleedVertical as Vertical } from "compositions/examples/bleed-vertical"
export { BleedWithDirection as Direction } from "compositions/examples/bleed-with-direction"
