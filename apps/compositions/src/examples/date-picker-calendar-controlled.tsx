"use client"

import { DatePicker, Stack, Text } from "@chakra-ui/react"
import { type DateValue, parseDate } from "@internationalized/date"
import { useState } from "react"

export const DatePickerCalendarControlled = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate("2025-03-15")])

  return (
    <Stack gap="4">
      <Text fontWeight="medium" textStyle="sm">
        Selected: {value[0]?.toString() || "None"}
      </Text>
      <DatePicker.Root
        value={value}
        onValueChange={(e) => setValue(e.value)}
        inline
        width="fit-content"
      >
        <DatePicker.Content unstyled>
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
      </DatePicker.Root>
    </Stack>
  )
}
