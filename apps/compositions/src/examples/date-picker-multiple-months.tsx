"use client"

import { DatePicker, Flex } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultipleMonths = () => {
  return (
    <DatePicker.Root numOfMonths={2}>
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Trigger>
          <LuCalendar />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger />
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
