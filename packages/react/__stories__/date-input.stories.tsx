import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Date Input",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DateInputBasic as Basic } from "compositions/examples/date-input-basic"
export { DateInputWithClearTrigger as WithClearTrigger } from "compositions/examples/date-input-with-clear-trigger"
export { DateInputWithSizes as Sizes } from "compositions/examples/date-input-with-sizes"
export { DateInputDisabled as Disabled } from "compositions/examples/date-input-disabled"
export { DateInputReadOnly as ReadOnly } from "compositions/examples/date-input-read-only"
export { DateInputInvalid as Invalid } from "compositions/examples/date-input-invalid"
export { DateInputControlled as Controlled } from "compositions/examples/date-input-controlled"
export { DateInputWithMinMax as WithMinMax } from "compositions/examples/date-input-with-min-max"
export { DateInputTimeOnly as TimeOnly } from "compositions/examples/date-input-time-only"
export { DateInputRange as Range } from "compositions/examples/date-input-range"
export { DateInputWithDatePicker as WithDatePicker } from "compositions/examples/date-input-with-date-picker"
export { DateInputWithHookForm as WithHookForm } from "compositions/examples/date-input-with-hook-form"
export { DateInputLeadingZeros as LeadingZeros } from "compositions/examples/date-input-leading-zeros"
export { DateInputRtl as Rtl } from "compositions/examples/date-input-rtl"
