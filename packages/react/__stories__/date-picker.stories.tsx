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
export { DatePickerWithButton as Button } from "compositions/examples/date-picker-with-button"
export { DatePickerWithClear as Clear } from "compositions/examples/date-picker-with-clear"
export { DatePickerControlled as Controlled } from "compositions/examples/date-picker-controlled"
export { DatePickerDefaultValue as DefaultValue } from "compositions/examples/date-picker-default-value"
export { DatePickerDefaultView as DefaultView } from "compositions/examples/date-picker-default-view"
export { DatePickerForm as Form } from "compositions/examples/date-picker-form"
export { DatePickerFormatParse as FormatParse } from "compositions/examples/date-picker-format-parse"
export { DatePickerInline as Inline } from "compositions/examples/date-picker-inline"
export { DatePickerLocale as Locale } from "compositions/examples/date-picker-locale"
export { DatePickerMinMax as MinMax } from "compositions/examples/date-picker-min-max"
export { DatePickerMonthRange as MonthRange } from "compositions/examples/date-picker-month-range"
export { DatePickerMultiSelection as MultiSelection } from "compositions/examples/date-picker-multi-selection"
export { DatePickerMultipleMonths as MultipleMonths } from "compositions/examples/date-picker-multiple-months"
export { DatePickerWithOutsideIcon as OutsideIcon } from "compositions/examples/date-picker-with-outside-icon"
export { DatePickerPresets as Presets } from "compositions/examples/date-picker-presets"
export { DatePickerRangeSelection as RangeSelection } from "compositions/examples/date-picker-range-selection"
export { DatePickerRootProvider as RootProvider } from "compositions/examples/date-picker-root-provider"
export { DatePickerWithSizes as Sizes } from "compositions/examples/date-picker-with-sizes"
export { DatePickerUnavailable as Unavailable } from "compositions/examples/date-picker-unavailable"
export { DatePickerWithVariants as Variant } from "compositions/examples/date-picker-with-variants"
export { DatePickerYearPickerRange as YearPickerRange } from "compositions/examples/date-picker-year-picker-range"
export { DatePickerYearPicker as YearPicker } from "compositions/examples/date-picker-year-picker"
