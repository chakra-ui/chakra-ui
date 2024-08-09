import { Box } from "../src"

export default {
  title: "Components / Progress",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { ProgressBasic as Basic } from "compositions/examples/progress-basic"
export { ProgressComposition as Composition } from "compositions/examples/progress-composition"
export { ProgressSizeTable as Sizes } from "compositions/examples/progress-size-table"
export { ProgressVariantTable as Variants } from "compositions/examples/progress-variant-table"
export { ProgressWithAnimatedStripes as WithAnimatedStripes } from "compositions/examples/progress-with-animated-stripes"
export { ProgressWithColors as Colors } from "compositions/examples/progress-with-colors"
export { ProgressWithInlineLabel as WithInlineLabel } from "compositions/examples/progress-with-inline-label"
export { ProgressWithLabelInfo as WithLabelInfo } from "compositions/examples/progress-with-label-info"
export { ProgressWithStripes as WithStripes } from "compositions/examples/progress-with-stripes"
