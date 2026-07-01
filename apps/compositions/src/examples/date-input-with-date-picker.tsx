"use client"

import { DateInput, DatePicker, Portal, useDateInput } from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

export const DateInputWithDatePicker = () => {
  const [value, setValue] = useState<DateInput.DateValue[]>([])

  const dateInput = useDateInput({
    value,
    onValueChange: (e) => setValue(e.value),
  })

  return (
    <DatePicker.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      maxWidth="14rem"
    >
      <DateInput.RootProvider value={dateInput}>
        <DateInput.Label>Date of birth</DateInput.Label>
        <DatePicker.Control>
          <DateInput.Control flex="1">
            <DateInput.Segments />
          </DateInput.Control>
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DateInput.HiddenInput />
      </DateInput.RootProvider>

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
