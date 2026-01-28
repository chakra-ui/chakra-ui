"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerUnavailable = () => {
  return (
    <DatePicker.Root isDateUnavailable={isWeekend} maxWidth="24rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
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
