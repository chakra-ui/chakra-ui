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
