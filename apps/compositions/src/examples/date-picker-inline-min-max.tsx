"use client"

import { DatePicker, parseDate } from "@chakra-ui/react"

export const DatePickerInlineMinMax = () => {
  return (
    <DatePicker.Root
      min={parseDate("2025-03-05")}
      max={parseDate("2025-03-25")}
      inline
      maxWidth="24rem"
    >
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
