"use client"

import { DatePicker, InputGroup, Portal } from "@chakra-ui/react"
import { LuCalendar, LuChevronsUpDown } from "react-icons/lu"

export const DatePickerWithInputGroup = () => {
  return (
    <DatePicker.Root maxWidth="24rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <InputGroup
        as={DatePicker.Control}
        startElement={<LuCalendar />}
        endElement={
          <DatePicker.Trigger>
            <LuChevronsUpDown />
          </DatePicker.Trigger>
        }
      >
        <DatePicker.Input />
      </InputGroup>
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
