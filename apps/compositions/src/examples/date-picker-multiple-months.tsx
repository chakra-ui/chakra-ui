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
          <DatePicker.Header />
          <Flex gap="4">
            <DatePicker.DayView />
            <DatePicker.DayView offset={1} />
          </Flex>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}
