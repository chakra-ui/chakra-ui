"use client"

import { DatePicker, Portal, Tag, Wrap } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" maxWidth="24rem">
      <DatePicker.Label>Select dates</DatePicker.Label>
      <DatePicker.Control pr={4}>
        <DatePicker.Context>
          {(datePicker) => (
            <Wrap>
              {datePicker.value.length === 0 ? (
                <span>Select dates...</span>
              ) : (
                datePicker.value.map((date, index) => (
                  <Tag.Root
                    key={index}
                    size="md"
                    variant="outline"
                    colorScheme="blue"
                  >
                    <Tag.Label>{formatWithDay(date)}</Tag.Label>
                    <Tag.EndElement>
                      <Tag.CloseTrigger
                        aria-label="Remove date"
                        onClick={() =>
                          datePicker.setValue(
                            datePicker.value.filter((_, i) => i !== index),
                          )
                        }
                      />
                    </Tag.EndElement>
                  </Tag.Root>
                ))
              )}
            </Wrap>
          )}
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
