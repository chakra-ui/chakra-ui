"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInline = () => {
  return (
    <DatePicker.Root inline maxWidth="24rem">
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
