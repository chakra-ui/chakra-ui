import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Switch",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SwitchBasic as Basic } from "compositions/examples/switch-basic"
export { SwitchControlled as Controlled } from "compositions/examples/switch-controlled"
export { SwitchSizeTable as Sizes } from "compositions/examples/switch-size-table"
export { SwitchVariantTable as Variants } from "compositions/examples/switch-variant-table"
export { SwitchWithDisabled as WithDisabled } from "compositions/examples/switch-with-disabled"
export { SwitchWithIndicator as WithIndicator } from "compositions/examples/switch-with-indicator"
export { SwitchWithInvalid as WithInvalid } from "compositions/examples/switch-with-invalid"
export { SwitchWithTooltip as WithTooltip } from "compositions/examples/switch-with-tooltip"
export { SwitchWithThumbIcon as WithThumbIcon } from "compositions/examples/switch-with-thumb-icon"
