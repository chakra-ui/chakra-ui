"use client"

import { DatePicker, Flex } from "@chakra-ui/react"

export const DatePickerInlineMultipleMonths = () => {
  return (
    <DatePicker.Root
      numOfMonths={2}
      selectionMode="range"
      inline
      width="fit-content"
    >
      <DatePicker.Content unstyled>
        <DatePicker.View view="day">
          <DatePicker.Header />
          <Flex gap="4">
            <DatePicker.DayTable />
            <DatePicker.DayTable offset={1} />
          </Flex>
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
  )
}
