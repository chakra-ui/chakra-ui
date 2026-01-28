"use client"

import { Button, DatePicker, Portal, Text } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithButton = () => {
  return (
    <DatePicker.Root maxWidth="24rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          {(ctx) => (
            <DatePicker.Trigger asChild unstyled>
              <Button variant="outline" width="full">
                <Text
                  color={ctx.value.length ? "inherit" : "gray.400"}
                  textAlign="left"
                  flex="1"
                >
                  {ctx.value.length
                    ? ctx.value[0].toDate("UTC").toLocaleDateString()
                    : "Select date"}
                </Text>
                <LuCalendar />
              </Button>
            </DatePicker.Trigger>
          )}
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
