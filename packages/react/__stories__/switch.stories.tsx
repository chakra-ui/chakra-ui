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
export { SwitchWithDisabled as Disabled } from "compositions/examples/switch-with-disabled"
export { SwitchWithHookForm as HookForm } from "compositions/examples/switch-with-hook-form"
export { SwitchWithInvalid as Invalid } from "compositions/examples/switch-with-invalid"
export { SwitchWithThumbLabel as ThumbLabel } from "compositions/examples/switch-with-thumb-label"
export { SwitchWithTooltip as Tooltip } from "compositions/examples/switch-with-tooltip"
export { SwitchWithTrackLabel as TrackLabel } from "compositions/examples/switch-with-track-label"
