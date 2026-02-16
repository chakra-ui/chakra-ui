import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Date Picker / Calendar",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DatePickerInline as Inline } from "compositions/examples/date-picker-inline"
export { DatePickerInlineControlled as Controlled } from "compositions/examples/date-picker-inline-controlled"
export { DatePickerInlineDefaultValue as DefaultValue } from "compositions/examples/date-picker-inline-default-value"
export { DatePickerInlineRangeSelection as RangeSelection } from "compositions/examples/date-picker-inline-range-selection"
export { DatePickerInlineMultiSelection as MultiSelection } from "compositions/examples/date-picker-inline-multi-selection"
export { DatePickerInlineMinMax as MinMax } from "compositions/examples/date-picker-inline-min-max"
export { DatePickerInlineUnavailable as UnavailableDates } from "compositions/examples/date-picker-inline-unavailable"
export { DatePickerInlineMultipleMonths as MultipleMonths } from "compositions/examples/date-picker-inline-multiple-months"
export { DatePickerInlineLocale as Locale } from "compositions/examples/date-picker-inline-locale"
export { DatePickerWithTimeGrid as TimeGrid } from "compositions/examples/date-picker-with-time-grid"
