"use client"

import { DatePicker, For, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerVariant = () => {
  return (
    <For each={["outline", "subtle", "filled", "unstyled"]}>
      {(variant) => (
        <DatePicker.Root variant={variant}>
          <DatePicker.Label>Select date - {variant}</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input />
            <DatePicker.IndicatorGroup>
              <DatePicker.Indicator>
                <LuCalendar />
              </DatePicker.Indicator>
              <DatePicker.ClearIndicator />
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
      )}
    </For>
  )
}
