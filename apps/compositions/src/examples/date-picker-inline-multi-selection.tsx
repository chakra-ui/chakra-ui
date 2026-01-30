"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInlineMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" inline maxWidth="24rem">
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
