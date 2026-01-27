"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerLocale = () => {
  return (
    <DatePicker.Root locale="de-DE" startOfWeek={1}>
      <DatePicker.Label>Datum auswählen</DatePicker.Label>
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
