"use client"

import { Button, DatePicker, Portal, Text } from "@chakra-ui/react"
import { LuCalendar, LuChevronDown } from "react-icons/lu"

export const DatePickerWithButton = () => {
  return (
    <DatePicker.Root maxWidth="24rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          {(ctx) => (
            <DatePicker.Trigger asChild>
              <Button
                variant="outline"
                p={1}
                width="100%"
                height="auto"
                justifyContent="flex-start"
                leftIcon={<LuCalendar size={20} />}
                rightIcon={<LuChevronDown size={20} />}
              >
                <Text color={ctx.value.length ? "inherit" : "gray.400"}>
                  {ctx.value.length
                    ? ctx.value[0].toDate("UTC").toLocaleDateString()
                    : "Select date"}
                </Text>
              </Button>
            </DatePicker.Trigger>
          )}
        </DatePicker.Context>
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
            <DatePicker.DayView />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
