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
        )}
      </For>
    </Stack>
  )
}
