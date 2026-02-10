"use client"

import { Button, DatePicker, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithTodayButton = () => {
  return (
    <DatePicker.Root maxWidth="24rem">
      <DatePicker.Label>Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
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
              <DatePicker.Context>
                {(api) => (
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => api.selectToday()}
                  >
                    Today
                  </Button>
                )}
              </DatePicker.Context>
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
  )
}
