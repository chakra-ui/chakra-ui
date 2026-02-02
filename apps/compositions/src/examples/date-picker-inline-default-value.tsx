"use client"

import { DatePicker, parseDate } from "@chakra-ui/react"

export const DatePickerInlineDefaultValue = () => {
  return (
    <DatePicker.Root
      defaultValue={[parseDate("2025-03-15")]}
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
