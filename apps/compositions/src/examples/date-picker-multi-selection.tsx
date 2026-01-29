"use client"

import { DatePicker, Portal, Tag } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" maxWidth="24rem">
      <DatePicker.Label>Select dates</DatePicker.Label>
      <DatePicker.Control pr={4}>
        <DatePicker.Context>
          <DatePicker.Value placeholder="Select date">
            {({ value, index, onRemove }) => (
              <Tag.Root size="md" variant="outline" colorScheme="blue">
                <Tag.Label>{formatWithDay(value!)}</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger onClick={() => onRemove(index)} />
                </Tag.EndElement>
              </Tag.Root>
            )}
          </DatePicker.Value>
        </DatePicker.Context>
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
    </DatePicker.Root>
  )
}

const formatWithDay = (date: DateValue) => {
  const jsDate = date.toDate("UTC")
  return jsDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}
