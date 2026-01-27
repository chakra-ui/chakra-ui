"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMinMax = () => {
  return (
    <DatePicker.Root
      min={parseDate("2025-03-05")}
      max={parseDate("2025-03-31")}
    >
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
