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

export { DatePickerCalendarBasic as Basic } from "compositions/examples/date-picker-calendar-basic"
export { DatePickerCalendarWithSizes as Sizes } from "compositions/examples/date-picker-calendar-with-sizes"
export { DatePickerCalendarHideOutsideDays as HideOutsideDays } from "compositions/examples/date-picker-calendar-hide-outside-days"
export { DatePickerCalendarControlled as Controlled } from "compositions/examples/date-picker-calendar-controlled"
export { DatePickerCalendarDefaultValue as DefaultValue } from "compositions/examples/date-picker-calendar-default-value"
export { DatePickerCalendarRangeSelection as RangeSelection } from "compositions/examples/date-picker-calendar-range-selection"
export { DatePickerCalendarMultiSelection as MultiSelection } from "compositions/examples/date-picker-calendar-multi-selection"
export { DatePickerCalendarMinMax as MinMax } from "compositions/examples/date-picker-calendar-min-max"
export { DatePickerCalendarUnavailable as UnavailableDates } from "compositions/examples/date-picker-calendar-unavailable"
export { DatePickerCalendarMultipleMonths as MultipleMonths } from "compositions/examples/date-picker-calendar-multiple-months"
export { DatePickerCalendarLocale as Locale } from "compositions/examples/date-picker-calendar-locale"
export { DatePickerWithTimeGrid as TimeGrid } from "compositions/examples/date-picker-with-time-grid"
