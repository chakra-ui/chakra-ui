import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Charts / Donut Chart",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DonutChartBasic as Basic } from "compositions/examples/charts/donut-chart-basic"
export { DonutChartWithPointLabel as PointLabel } from "compositions/examples/charts/donut-chart-with-point-label"
export { DonutWithCenteredText as CenteredText } from "compositions/examples/charts/donut-with-centered-text"
export { DonutWithAnglePadding as AnglePadding } from "compositions/examples/charts/donut-with-angle-padding"
export { DonutWithStartAndEndAngle as StartAndEndAngle } from "compositions/examples/charts/donut-with-start-and-end-angle"
export { DonutWithDetachedSegment as DetachedSegment } from "compositions/examples/charts/donut-with-detached-segment"
export { DonutWithOtherLabel as OtherLabel } from "compositions/examples/charts/donut-with-other-label"
