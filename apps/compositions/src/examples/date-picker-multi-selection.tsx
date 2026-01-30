"use client"

import { DatePicker, Portal, Tag, Wrap } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" maxWidth="24rem">
      <DatePicker.Label>Date of birth</DatePicker.Label>
      <DatePicker.Control pr={4}>
        <Wrap gap="2">
          <DatePicker.ValueText placeholder="Select dates...">
            {({ value, index, remove }) => (
              <Tag.Root key={index} variant="outline">
                <Tag.Label>{formatWithDay(value)}</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger onClick={remove} />
                </Tag.EndElement>
              </Tag.Root>
            )}
          </DatePicker.ValueText>
        </Wrap>
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
