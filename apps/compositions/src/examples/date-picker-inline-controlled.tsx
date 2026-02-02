"use client"

import { DatePicker, Text, VStack, parseDate } from "@chakra-ui/react"
import { useState } from "react"

export const DatePickerInlineControlled = () => {
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
        maxWidth="24rem"
      >
        <DatePicker.Content>
          <DatePicker.Header />
          <DatePicker.DayView />
          <DatePicker.MonthView />
          <DatePicker.YearView />
        </DatePicker.Content>
      </DatePicker.Root>
    </VStack>
  )
}
