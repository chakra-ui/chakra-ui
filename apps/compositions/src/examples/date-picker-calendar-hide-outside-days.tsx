"use client"

import { DatePicker } from "@chakra-ui/react"
import { parseDate } from "@internationalized/date"

export const DatePickerCalendarHideOutsideDays = () => {
  return (
    <DatePicker.Root
      hideOutsideDays
      inline
      width="fit-content"
      defaultValue={[parseDate("2025-03-15")]}
    >
      <DatePicker.Content unstyled>
        <DatePicker.View view="day">
          <DatePicker.Header />
          <DatePicker.DayTable />
        </DatePicker.View>
        <DatePicker.View view="month">
          <DatePicker.Header />
          <DatePicker.MonthTable />
        </DatePicker.View>
        <DatePicker.View view="year">
          <DatePicker.Header />
          <DatePicker.YearTable />
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
