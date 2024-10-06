import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Heading",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { HeadingBasic as Basic } from "compositions/examples/heading-basic"
export { HeadingWithSizes as Sizes } from "compositions/examples/heading-with-sizes"
export { HeadingWithAsProp as AsProps } from "compositions/examples/heading-with-as-prop"
export { HeadingWithWeights as Weights } from "compositions/examples/heading-with-weights"
export { HeadingWithHighlight as Highlight } from "compositions/examples/heading-with-highlight"
export { HeadingWithComposition as Composition } from "compositions/examples/heading-with-composition"
export { HeadingWithGradient as Gradient } from "compositions/examples/heading-with-gradient"
