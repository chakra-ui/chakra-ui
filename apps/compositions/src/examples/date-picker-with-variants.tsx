"use client"

import { DatePicker, For, Portal, Stack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithVariants = () => {
  return (
    <Stack gap={4} maxWidth="20rem">
      <For each={["outline", "subtle", "flushed"]}>
        {(variant) => (
          <DatePicker.Root key={variant} variant={variant}>
            <DatePicker.Label>Select date - {variant}</DatePicker.Label>
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
