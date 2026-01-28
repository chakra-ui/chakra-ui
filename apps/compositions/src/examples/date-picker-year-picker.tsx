"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerYearPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
      maxWidth="24rem"
    >
      <DatePicker.Label>Select year</DatePicker.Label>
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
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => date.year.toString()

const parse = (string: string | undefined) => {
  if (string === "" || !string) return
  const year = Number(string)
  if (year < 100) {
    const currentYear = new Date().getFullYear()
    const currentCentury = Math.floor(currentYear / 100) * 100
    return parseDate(new Date(currentCentury + year, 0))
  }
  return parseDate(new Date(Number(string), 0))
}
