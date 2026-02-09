"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInlineLocale = () => {
  return (
    <DatePicker.Root locale="de-DE" startOfWeek={1} inline maxWidth="24rem">
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
    </DatePicker.Root>
  )
}
