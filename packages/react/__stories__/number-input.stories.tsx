import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / NumberInput",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { NumberInputBasic as Basic } from "compositions/examples/number-input-basic"
export { NumberInputControlled as Controlled } from "compositions/examples/number-input-controlled"
export { NumberInputWithDisabled as Disabled } from "compositions/examples/number-input-with-disabled"
export { NumberInputWithField as Field } from "compositions/examples/number-input-with-field"
export { NumberInputWithFormatOptions as FormatOptions } from "compositions/examples/number-input-with-format-options"
export { NumberInputWithHookForm as HookForm } from "compositions/examples/number-input-with-hook-form"
export { NumberInputWithInvalid as Invalid } from "compositions/examples/number-input-with-invalid"
export { NumberInputWithMinMax as MinMax } from "compositions/examples/number-input-with-min-max"
export { NumberInputWithMouseWheel as MouseWheel } from "compositions/examples/number-input-with-mouse-wheel"
export { NumberInputWithScrubber as Scrubber } from "compositions/examples/number-input-with-scrubber"
export { NumberInputWithSizes as Sizes } from "compositions/examples/number-input-with-sizes"
export { NumberInputWithStep as Step } from "compositions/examples/number-input-with-step"
