import { Box } from "../src"

export default {
  title: "Components / Progress Circle",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { ProgressCircleBasic as Basic } from "compositions/examples/progress-circle-basic"
export { ProgressCircleIndeterminate as Indeterminate } from "compositions/examples/progress-circle-indeterminate"
export { ProgressCircleWithColors as Colors } from "compositions/examples/progress-circle-with-colors"
export { ProgressCircleWithRoundCap as WithRoundCap } from "compositions/examples/progress-circle-with-round-cap"
export { ProgressCircleWithSizes as Sizes } from "compositions/examples/progress-circle-with-sizes"
export { ProgressCircleWithThickness as CustomThickness } from "compositions/examples/progress-circle-with-thickness"
export { ProgressCircleWithValueText as WithValueText } from "compositions/examples/progress-circle-with-value-text"
