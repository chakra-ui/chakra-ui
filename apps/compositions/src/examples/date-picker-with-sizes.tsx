"use client"

import { DatePicker, For, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithSizes = () => {
  return (
    <Stack gap={4} maxWidth="24rem">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <DatePicker.Root key={size} size={size}>
            <DatePicker.Label>Select date - {size}</DatePicker.Label>
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
        )}
      </For>
    </Stack>
  )
}
