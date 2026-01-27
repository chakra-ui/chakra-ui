"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerUnavailable = () => {
  return (
    <DatePicker.Root isDateUnavailable={isWeekend}>
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger>
          <LuCalendar />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger />
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.Header />
            <DatePicker.DayView />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const isWeekend = (date: DateValue) => {
  const dayOfWeek = date.toDate("UTC").getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}
