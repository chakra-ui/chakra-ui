import { Box } from "../src"

export default {
  title: "Components / Switch",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { SwitchBasic as Basic } from "compositions/examples/switch-basic"
export { SwitchControlled as Controlled } from "compositions/examples/switch-controlled"
export { SwitchWithDisabled as WithDisabled } from "compositions/examples/switch-with-disabled"
export { SwitchWithTooltip as WithTooltip } from "compositions/examples/switch-with-tooltip"
export { SwitchWithInvalid as WithInvalid } from "compositions/examples/switch-with-invalid"
export { SwitchWithIndicator as WithIndicator } from "compositions/examples/switch-with-indicator"
export { SwitchVariantTable as Variants } from "compositions/examples/switch-variant-table"
export { SwitchSizeTable as Sizes } from "compositions/examples/switch-size-table"
