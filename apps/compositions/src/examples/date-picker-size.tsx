"use client"

import { DatePicker, Flex, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerSizes = () => {
  return (
    <Stack gap="4">
      <Flex>
        <DatePicker.Root size="sm">
          <DatePicker.Label>Small (sm)</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
            <DatePicker.ClearTrigger />
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
      </Flex>
      <Flex>
        <DatePicker.Root size="md">
          <DatePicker.Label>Medium (md)</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
            <DatePicker.ClearTrigger />
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
      </Flex>
      <Flex>
        <DatePicker.Root size="lg">
          <DatePicker.Label>Large (lg)</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
            <DatePicker.ClearTrigger />
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
      </Flex>
    </Stack>
  )
}
