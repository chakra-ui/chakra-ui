"use client"

import { DatePicker } from "@chakra-ui/react"

export const DatePickerInline = () => {
  return (
    <DatePicker.Root inline width="fit-content">
      <DatePicker.Content unstyled>
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
