"use client"

import { DatePicker } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"

export const DatePickerInlineUnavailable = () => {
  return (
    <DatePicker.Root isDateUnavailable={isWeekend} inline maxWidth="24rem">
      <DatePicker.Content>
        <DatePicker.Header />
        <DatePicker.DayView />
        <DatePicker.MonthView />
        <DatePicker.YearView />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}

const isWeekend = (date: DateValue) => {
  const dayOfWeek = date.toDate("UTC").getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}
