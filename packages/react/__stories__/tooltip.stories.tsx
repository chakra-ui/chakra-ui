import { Box } from "../src"

export default {
  title: "Components / Tooltip",
  decorators: [
    (Story: any) => (
      <Box maxWidth="400px" mx="auto" mt="200px">
        <Story />
      </Box>
    ),
  ],
}

export { TooltipBasic as Basic } from "compositions/examples/tooltip-basic"
export { TooltipControlled as Controlled } from "compositions/examples/tooltip-controlled"
export { TooltipMultiple as Multiple } from "compositions/examples/tooltip-multiple"
export { TooltipWithArrow as WithArrow } from "compositions/examples/tooltip-with-arrow"
export { TooltipWithCustomBg as WithCustomBg } from "compositions/examples/tooltip-with-custom-bg"
export { TooltipWithDelay as WithDelay } from "compositions/examples/tooltip-with-delay"
export { TooltipWithDisabled as WithDisabled } from "compositions/examples/tooltip-with-disabled"
export { TooltipWithInteractive as WithInteractive } from "compositions/examples/tooltip-with-interactive"
export { TooltipWithOffset as WithOffset } from "compositions/examples/tooltip-with-offset"
export { TooltipWithPlacement as WithPlacement } from "compositions/examples/tooltip-with-placement"
