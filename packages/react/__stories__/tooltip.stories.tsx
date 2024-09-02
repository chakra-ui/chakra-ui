import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Tooltip",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TooltipBasic as Basic } from "compositions/examples/tooltip-basic"
export { TooltipControlled as Controlled } from "compositions/examples/tooltip-controlled"
export { TooltipMultiple as Multiple } from "compositions/examples/tooltip-multiple"
export { TooltipWithArrow as Arrow } from "compositions/examples/tooltip-with-arrow"
export { TooltipWithCustomBg as CustomBg } from "compositions/examples/tooltip-with-custom-bg"
export { TooltipWithDelay as Delay } from "compositions/examples/tooltip-with-delay"
export { TooltipWithDisabled as Disabled } from "compositions/examples/tooltip-with-disabled"
export { TooltipWithInteractive as Interactive } from "compositions/examples/tooltip-with-interactive"
export { TooltipWithOffset as Offset } from "compositions/examples/tooltip-with-offset"
export { TooltipWithPlacement as Placement } from "compositions/examples/tooltip-with-placement"
