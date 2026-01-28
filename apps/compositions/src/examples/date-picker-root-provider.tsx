"use client"

import {
  Button,
  DatePicker,
  Portal,
  Stack,
  useDatePicker,
} from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerRootProvider = () => {
  const datePicker = useDatePicker()
  return (
    <Stack gap={4} align="flex-start" maxWidth="24rem">
      <Button
        variant="outline"
        size="sm"
        onClick={() => datePicker.clearValue()}
      >
        Clear
      </Button>

      <DatePicker.RootProvider value={datePicker}>
        <DatePicker.Label>Select range</DatePicker.Label>
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
              <DatePicker.Header />
              <DatePicker.DayView />
              <DatePicker.MonthView />
              <DatePicker.YearView />
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.RootProvider>
    </Stack>
  )
}
