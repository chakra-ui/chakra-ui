"use client"

import {
  DatePicker,
  Portal,
  Stack,
  Text,
  useDatePicker,
} from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerRootProvider = () => {
  const datePicker = useDatePicker()
  return (
    <Stack gap={4} align="flex-start" maxWidth="20rem">
      <Text textStyle="sm">
        Selected: {datePicker.valueAsString.join(", ") || "None"}
      </Text>

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
      </DatePicker.RootProvider>
    </Stack>
  )
}
