"use client"

import { Button, DatePicker, Portal, Stack } from "@chakra-ui/react"
import { getLocalTimeZone, isWeekend, today } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerForm = () => {
  const now = today(getLocalTimeZone())

  const disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ]

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        alert(JSON.stringify({ date: form.get("date") }))
      }}
    >
      <Stack gap="4" align="flex-start" maxW="sm">
        <DatePicker.Root
          name="date"
          min={now}
          isDateUnavailable={(date) =>
            isWeekend(date, "en") ||
            disabledRanges.some(
              (interval) =>
                date.compare(interval[0]) >= 0 &&
                date.compare(interval[1]) <= 0,
            )
          }
        >
          <DatePicker.Label>Appointment date</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.Input required />
            <DatePicker.IndicatorGroup>
              <DatePicker.Trigger>
                <LuCalendar />
              </DatePicker.Trigger>
            </DatePicker.IndicatorGroup>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content>
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
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
