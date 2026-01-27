"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerDefaultValue = () => {
  return (
    <DatePicker.Root defaultValue={[parseDate("2026-01-26")]}>
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
