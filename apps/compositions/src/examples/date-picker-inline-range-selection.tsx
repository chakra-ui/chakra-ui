import { DatePicker } from "@chakra-ui/react"

export const DatePickerInlineRangeSelection = () => {
  return (
    <DatePicker.Root selectionMode="range" inline maxWidth="24rem">
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
