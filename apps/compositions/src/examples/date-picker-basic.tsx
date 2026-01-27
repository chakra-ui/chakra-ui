"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerBasic = () => {
  return (
    <DatePicker.Root>
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
