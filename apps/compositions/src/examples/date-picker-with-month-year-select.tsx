"use client"

import { DatePicker, HStack, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithMonthYearSelect = () => {
  return (
    <DatePicker.Root maxWidth="20rem">
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
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger />
                <HStack>
                  <DatePicker.MonthSelect />
                  <DatePicker.YearSelect />
                </HStack>
                <DatePicker.NextTrigger />
              </DatePicker.ViewControl>
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
