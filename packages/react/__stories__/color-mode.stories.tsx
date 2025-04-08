import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Color Mode",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ColorModeBasic as Basic } from "compositions/examples/color-mode-basic"
export { ColorModeForced as Forced } from "compositions/examples/color-mode-forced"
export { ColorModeIconButton as IconButton } from "compositions/examples/color-mode-icon-button"
export { ColorModeValue as Value } from "compositions/examples/color-mode-value"
export { ColorModeValueFallback as ValueFallback } from "compositions/examples/color-mode-value-fallback"
