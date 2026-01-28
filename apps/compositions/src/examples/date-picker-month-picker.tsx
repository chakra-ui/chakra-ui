"Use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import { CalendarDate, type DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMonthPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="month"
      minView="month"
      placeholder="mm/yyyy"
      maxWidth="24rem"
    >
      <DatePicker.Label>Select month</DatePicker.Label>
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
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

const format = (date: DateValue) => {
  const month = date.month.toString().padStart(2, "0")
  const year = date.year.toString()
  return `${month}/${year}`
}

const parse = (string: string) => {
  const fullRegex = /^(\d{1,2})\/(\d{4})$/
  const fullMatch = string.match(fullRegex)
  if (fullMatch) {
    const [_, month, year] = fullMatch.map(Number)
    return new CalendarDate(year, month, 1)
  }
}
