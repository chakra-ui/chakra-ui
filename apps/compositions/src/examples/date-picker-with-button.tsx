"use client"

import { Button, DatePicker, HStack, Portal, Text } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithButton = () => {
  return (
    <DatePicker.Root maxWidth="24rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          <DatePicker.Trigger asChild>
            <Button
              variant="outline"
              width="full"
              height="2.5rem"
              px={4}
              justifyContent="space-between"
            >
              <HStack w="100%" justify="space-between">
                <DatePicker.Value placeholder="Select date" />
                <LuCalendar size={20} />
              </HStack>
            </Button>
          </DatePicker.Trigger>
        </DatePicker.Context>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.Header />
            <DatePicker.DayView />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
