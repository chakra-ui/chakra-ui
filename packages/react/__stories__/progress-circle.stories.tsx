import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Progress Circle",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ProgressCircleBasic as Basic } from "compositions/examples/progress-circle-basic"
export { ProgressCircleIndeterminate as Indeterminate } from "compositions/examples/progress-circle-indeterminate"
export { ProgressCircleWithColors as Colors } from "compositions/examples/progress-circle-with-colors"
export { ProgressCircleWithRangeColor as RangeColor } from "compositions/examples/progress-circle-with-range-color"
export { ProgressCircleWithRoundCap as RoundCap } from "compositions/examples/progress-circle-with-round-cap"
export { ProgressCircleWithSizes as Sizes } from "compositions/examples/progress-circle-with-sizes"
export { ProgressCircleWithThickness as CustomThickness } from "compositions/examples/progress-circle-with-thickness"
export { ProgressCircleWithValueText as ValueText } from "compositions/examples/progress-circle-with-value-text"
