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
export { DonutChartWithCenteredText as CenteredText } from "compositions/examples/charts/donut-chart-with-centered-text"
export { DonutChartWithAnglePadding as AnglePadding } from "compositions/examples/charts/donut-chart-with-angle-padding"
export { DonutChartWithStartAndEndAngle as StartAndEndAngle } from "compositions/examples/charts/donut-chart-with-start-and-end-angle"
export { DonutChartWithDetachedSegment as DetachedSegment } from "compositions/examples/charts/donut-chart-with-detached-segment"
export { DonutChartWithOtherLabel as OtherLabel } from "compositions/examples/charts/donut-chart-with-other-label"
