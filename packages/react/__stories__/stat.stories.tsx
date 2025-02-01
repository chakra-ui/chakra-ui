import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Stat",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { StatBasic as Basic } from "compositions/examples/stat-basic"
export { StatWithFormatOptions as FormatOptions } from "compositions/examples/stat-with-format-options"
export { StatWithGroup as StatGroup } from "compositions/examples/stat-with-group"
export { StatWithIcon as Icon } from "compositions/examples/stat-with-icon"
export { StatWithIndicator as Indicator } from "compositions/examples/stat-with-indicator"
export { StatWithInfoTip as InfoTip } from "compositions/examples/stat-with-info-tip"
export { StatWithProgressBar as ProgressBar } from "compositions/examples/stat-with-progress-bar"
export { StatWithTrend as Trend } from "compositions/examples/stat-with-trend"
export { StatWithValueUnit as ValueUnit } from "compositions/examples/stat-with-value-unit"
