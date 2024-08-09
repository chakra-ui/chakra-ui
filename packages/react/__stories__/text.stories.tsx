import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / Text",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TextBasic as Basic } from "compositions/examples/text-basic"
export { TextWithAsProp as AsProps } from "compositions/examples/text-with-as-prop"
export { TextWithTruncate as Truncate } from "compositions/examples/text-with-truncate"
export { TextWithLineClamp as LineClamp } from "compositions/examples/text-with-line-clamp"
export { TextWithSizes as Sizes } from "compositions/examples/text-with-sizes"
export { TextWithWeights as Weights } from "compositions/examples/text-with-weights"
