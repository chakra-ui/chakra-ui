"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInlineLocale = () => {
  return (
    <DatePicker.Root locale="de-DE" startOfWeek={1} inline maxWidth="24rem">
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
