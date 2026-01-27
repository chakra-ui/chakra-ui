"use client"

import { DatePicker, Portal } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar, LuX } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple">
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Context>
          {(datePicker) => (
            <div>
              {datePicker.value.length === 0 ? (
                <span>Select dates...</span>
              ) : (
                datePicker.value.map((date, index) => (
                  <span key={index}>
                    {formatWithDay(date)}
                    <button
                      onClick={() =>
                        datePicker.setValue(
                          datePicker.value.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <LuX />
                    </button>
                  </span>
                ))
              )}
            </div>
          )}
        </DatePicker.Context>
        <DatePicker.Trigger>
          <LuCalendar />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger />
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
