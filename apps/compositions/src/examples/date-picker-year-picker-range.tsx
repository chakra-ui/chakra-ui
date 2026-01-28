"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { CalendarDate, type DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerYearPickerRange = () => {
  return (
    <DatePicker.Root
      selectionMode="range"
      defaultView="year"
      minView="year"
      format={format}
      parse={parse}
      placeholder="yyyy"
      maxWidth="24rem"
    >
      <DatePicker.Label>Select year range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
        <DatePicker.ClearTrigger />
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.Header />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => date.year.toString()

const parse = (string: string) => {
  const fullRegex = /^(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [_, year] = fullMatch.map(Number)
    return new CalendarDate(year, 1, 1)
  }
}
