"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { PersianCalendar } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

const createCalendar = (identifier: string) => {
  switch (identifier) {
    case "persian":
      return new PersianCalendar()
    default:
      throw new Error(`Unsupported calendar: ${identifier}`)
  }
}

export const DatePickerPersianCalendar = () => {
  return (
    <DatePicker.Root
      locale="fa-IR"
      createCalendar={createCalendar}
      startOfWeek={6}
      maxWidth="20rem"
    >
      <DatePicker.Label>تاریخ را انتخاب کنید</DatePicker.Label>
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
