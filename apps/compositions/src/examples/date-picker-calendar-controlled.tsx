"use client"

import { DatePicker, Text, VStack, parseDate } from "@chakra-ui/react"
import { useState } from "react"

export const DatePickerCalendarControlled = () => {
  const [value, setValue] = useState([parseDate("2025-03-15")])

  return (
    <VStack gap="4" align="flex-start">
      <Text fontWeight="medium">
        Selected: {value[0]?.toString() ?? "None"}
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
    </VStack>
  )
}
