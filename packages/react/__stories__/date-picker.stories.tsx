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
export { DatePickerWithSizes as Sizes } from "compositions/examples/date-picker-with-sizes"
export { DatePickerWithVariants as Variants } from "compositions/examples/date-picker-with-variants"
export { DatePickerDisabled as Disabled } from "compositions/examples/date-picker-disabled"
export { DatePickerReadOnly as ReadOnly } from "compositions/examples/date-picker-read-only"
export { DatePickerControlled as Controlled } from "compositions/examples/date-picker-controlled"
export { DatePickerRootProvider as Store } from "compositions/examples/date-picker-root-provider"
export { DatePickerDefaultValue as DefaultValue } from "compositions/examples/date-picker-default-value"
export { DatePickerDefaultView as DefaultView } from "compositions/examples/date-picker-default-view"
export { DatePickerRangeSelection as RangeSelection } from "compositions/examples/date-picker-range-selection"
export { DatePickerMultiSelection as MultipleSelection } from "compositions/examples/date-picker-multi-selection"
export { DatePickerMonthPicker as MonthPicker } from "compositions/examples/date-picker-month-picker"
export { DatePickerMonthRange as MonthRange } from "compositions/examples/date-picker-month-range"
export { DatePickerYearPicker as YearPicker } from "compositions/examples/date-picker-year-picker"
export { DatePickerYearPickerRange as YearRange } from "compositions/examples/date-picker-year-picker-range"
export { DatePickerMinMax as MinMax } from "compositions/examples/date-picker-min-max"
export { DatePickerUnavailable as UnavailableDates } from "compositions/examples/date-picker-unavailable"
export { DatePickerFormatParse as FormatParse } from "compositions/examples/date-picker-format-parse"
export { DatePickerLocale as Localization } from "compositions/examples/date-picker-locale"
export { DatePickerWithButton as ButtonTrigger } from "compositions/examples/date-picker-with-button"
export { DatePickerWithOutsideIcon as OutsideIcon } from "compositions/examples/date-picker-with-outside-icon"
export { DatePickerWithInputGroup as InputGroup } from "compositions/examples/date-picker-with-input-group"
export { DatePickerWithClear as ClearIcon } from "compositions/examples/date-picker-with-clear"
export { DatePickerWithPlacement as Placement } from "compositions/examples/date-picker-with-placement"
export { DatePickerWithHeaderLayout as HeaderLayout } from "compositions/examples/date-picker-with-header-layout"
export { DatePickerWithMonthYearSelect as MonthYearSelect } from "compositions/examples/date-picker-with-month-year-select"
export { DatePickerMultipleMonths as MultipleMonths } from "compositions/examples/date-picker-multiple-months"
export { DatePickerPresets as Presets } from "compositions/examples/date-picker-presets"
export { DatePickerWithPresetsSidebar as PresetsSidebar } from "compositions/examples/date-picker-with-presets-sidebar"
export { DatePickerWithTodayButton as TodayButton } from "compositions/examples/date-picker-with-today-button"
export { DatePickerWithTime as WithTime } from "compositions/examples/date-picker-with-time"
export { DatePickerForm as Form } from "compositions/examples/date-picker-form"
export { DatePickerWithHookForm as HookForm } from "compositions/examples/date-picker-with-hook-form"
export { DatePickerWithField as Field } from "compositions/examples/date-picker-with-field"
