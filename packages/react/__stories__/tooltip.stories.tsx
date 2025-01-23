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
export { TooltipControlledMultiple as ControlledMultiple } from "compositions/examples/tooltip-controlled-multiple"
export { TooltipMultiple as Multiple } from "compositions/examples/tooltip-multiple"
export { TooltipWithArrow as Arrow } from "compositions/examples/tooltip-with-arrow"
export { TooltipWithAvatar as WithAvatar } from "compositions/examples/tooltip-with-avatar"
export { TooltipWithCheckbox as WithCheckbox } from "compositions/examples/tooltip-with-checkbox"
export { TooltipWithCustomBg as CustomBg } from "compositions/examples/tooltip-with-custom-bg"
export { TooltipWithDelay as Delay } from "compositions/examples/tooltip-with-delay"
export { TooltipWithDialog as WithDialog } from "compositions/examples/tooltip-with-dialog"
export { TooltipWithDisabled as Disabled } from "compositions/examples/tooltip-with-disabled"
export { TooltipWithInteractive as Interactive } from "compositions/examples/tooltip-with-interactive"
export { TooltipWithMenuItem as WithMenuItem } from "compositions/examples/tooltip-with-menu-item"
export { TooltipWithMenuTrigger as WithMenuTrigger } from "compositions/examples/tooltip-with-menu-trigger"
export { TooltipWithOffset as Offset } from "compositions/examples/tooltip-with-offset"
export { TooltipWithPlacement as Placement } from "compositions/examples/tooltip-with-placement"
export { TooltipWithStore as WithStore } from "compositions/examples/tooltip-with-store"
export { TooltipWithSwitch as WithSwitch } from "compositions/examples/tooltip-with-switch"
export { TooltipWithTab as WithTab } from "compositions/examples/tooltip-with-tab"
export { TooltipWithoutSnippet as WithoutSnippet } from "compositions/examples/tooltip-without-snippet"
