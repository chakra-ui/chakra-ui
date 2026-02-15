"use client"

import { DatePicker, Flex } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultipleMonths = () => {
  return (
    <DatePicker.Root numOfMonths={2} maxWidth="24rem">
      <DatePicker.Label>Select months</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Header />
            <Flex gap="4">
              <DatePicker.DayTable />
              <DatePicker.DayTable offset={1} />
            </Flex>
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
    </DatePicker.Root>
  )
}
