"use client"

import { DatePicker, parseDate } from "@chakra-ui/react"

export const DatePickerInlineMinMax = () => {
  return (
    <DatePicker.Root
      min={parseDate("2025-03-05")}
      max={parseDate("2025-03-25")}
      inline
      width="fit-content"
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
