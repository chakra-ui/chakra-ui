"use client"

import { DatePicker, Flex } from "@chakra-ui/react"

export const DatePickerInlineMultipleMonths = () => {
  return (
    <DatePicker.Root
      numOfMonths={2}
      selectionMode="range"
      inline
      maxWidth="48rem"
    >
      <DatePicker.Content>
        <DatePicker.Header />
        <Flex gap="4">
          <DatePicker.DayView />
          <DatePicker.DayView offset={1} />
        </Flex>
      </DatePicker.Content>
    </DatePicker.Root>
  )
}
