"use client"

import { Button, DatePicker, Input, Portal } from "@chakra-ui/react"
import {
  CalendarDateTime,
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

const formatter = new DateFormatter("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

export const DatePickerWithTime = () => {
  const [value, setValue] = useState<CalendarDateTime[]>([
    new CalendarDateTime(2025, 1, 29, 14, 30),
  ])

  const timeValue = value[0]
    ? `${String(value[0].hour).padStart(2, "0")}:${String(value[0].minute).padStart(2, "0")}`
    : ""

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.currentTarget.value.split(":").map(Number)
    setValue((prev) => {
      const current = prev[0] ?? new CalendarDateTime(2025, 1, 1, 0, 0)
      return [current.set({ hour: hours, minute: minutes })]
    })
  }

  const onDateChange = (details: { value: DateValue[] }) => {
    const newDate = details.value[0]
    if (!newDate) return setValue([])
    const prevTime = value[0] ?? { hour: 0, minute: 0 }
    setValue([
      new CalendarDateTime(
        newDate.year,
        newDate.month,
        newDate.day,
        prevTime.hour,
        prevTime.minute,
      ),
    ])
  }

  return (
    <DatePicker.Root
      value={value}
      onValueChange={onDateChange}
      closeOnSelect={false}
      maxWidth="24rem"
    >
      <DatePicker.Label>Date and time</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Trigger asChild unstyled>
          <Button variant="outline" width="full" justifyContent="space-between">
            {value[0]
              ? formatter.format(value[0].toDate(getLocalTimeZone()))
              : "Select date and time"}
            <LuCalendar />
          </Button>
        </DatePicker.Trigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
              <Input type="time" value={timeValue} onChange={onTimeChange} />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
