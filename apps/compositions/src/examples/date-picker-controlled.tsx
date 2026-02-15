"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerControlled = () => {
  const [value, setValue] = useState([parseDate("2026-01-26")])

  return (
    <DatePicker.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      maxWidth="24rem"
    >
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
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
