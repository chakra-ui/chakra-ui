import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Timeline",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TimelineAlternating as Alternating } from "compositions/examples/timeline-alternating"
export { TimelineBasic as Basic } from "compositions/examples/timeline-basic"
export { TimelineComposition as Composition } from "compositions/examples/timeline-composition"
export { TimelineWithContentBefore as ContentBefore } from "compositions/examples/timeline-with-content-before"
export { TimelineWithSizes as Sizes } from "compositions/examples/timeline-with-sizes"
export { TimelineWithVariants as Variants } from "compositions/examples/timeline-with-variants"
