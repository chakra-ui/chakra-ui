import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Date Picker",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DatePickerBasic as Basic } from "compositions/examples/date-picker-basic"
export { DatePickerControlled as Controlled } from "compositions/examples/date-picker-controlled"
export { DatePickerRange as Range } from "compositions/examples/date-picker-range"
export { DatePickerWithHookForm as HookForm } from "compositions/examples/date-picker-with-hook-form"
export { DatePickerWithPresets as Presets } from "compositions/examples/date-picker-with-presets"
export { DatePickerWithSizes as Sizes } from "compositions/examples/date-picker-with-sizes"
export { DatePickerWithVariants as Variants } from "compositions/examples/date-picker-with-variants"
export { DatePickerWithDisabled as Disabled } from "compositions/examples/date-picker-with-disabled"
export { DatePickerWithReadonly as Readonly } from "compositions/examples/date-picker-with-readonly"
export { DatePickerInputOnly as InputOnly } from "compositions/examples/date-picker-input-only"
export { DatePickerTriggerOnly as TriggerOnly } from "compositions/examples/date-picker-trigger-only"
export { DatePickerWithFormat as Format } from "compositions/examples/date-picker-with-format"
export { DatePickerWithMinMax as MinMax } from "compositions/examples/date-picker-with-min-max"
export { DatePickerWithTimezone as Timezone } from "compositions/examples/date-picker-with-timezone"
