import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Segment Group",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SegmentedControlBasic as Basic } from "compositions/examples/segmented-control-basic"
export { SegmentedControlControlled as Controlled } from "compositions/examples/segmented-control-controlled"
export { SegmentedControlInCard as Card } from "compositions/examples/segmented-control-in-card"
export { SegmentedControlVertical as Vertical } from "compositions/examples/segmented-control-vertical"
export { SegmentedControlWithDisabled as Disabled } from "compositions/examples/segmented-control-with-disabled"
export { SegmentedControlWithDisabledItem as DisabledItem } from "compositions/examples/segmented-control-with-disabled-item"
export { SegmentedControlWithHookForm as HookForm } from "compositions/examples/segmented-control-with-hook-form"
export { SegmentedControlWithIcon as Icon } from "compositions/examples/segmented-control-with-icon"
export { SegmentedControlWithSizes as Sizes } from "compositions/examples/segmented-control-with-sizes"
