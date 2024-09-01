import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Box",
  decorators: [
    (Story) => (
      <Box p="4">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { BoxBasic as Basic } from "compositions/examples/box-basic"
export { BoxWithPseudoProps as PseudoProps } from "compositions/examples/box-with-pseudo-props"
export { BoxWithHideBelow as HideBelow } from "compositions/examples/box-with-hide-below"
export { BoxWithHideFrom as HideFrom } from "compositions/examples/box-with-hide-from"
export { BoxWithShadow as Shadow } from "compositions/examples/box-with-shadow"
export { BoxWithBorder as Border } from "compositions/examples/box-with-border"
export { BoxWithAsProp as AsProp } from "compositions/examples/box-with-as-prop"
export { BoxPropertyCard as Composition } from "compositions/examples/box-property-card"
