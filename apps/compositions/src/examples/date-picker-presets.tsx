"use client"

import { DatePicker, HStack, Portal } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerPresets = () => {
  return (
    <DatePicker.Root selectionMode="range">
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.Trigger>
          <LuCalendar />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger />
      </DatePicker.Control>
      <HStack>
        <DatePicker.PresetTrigger value="last7Days">
          Last 7 days
        </DatePicker.PresetTrigger>
        <DatePicker.PresetTrigger value="last30Days">
          Last 30 days
        </DatePicker.PresetTrigger>
        <DatePicker.PresetTrigger value="thisMonth">
          This month
        </DatePicker.PresetTrigger>
        <DatePicker.PresetTrigger value="lastMonth">
          Last month
        </DatePicker.PresetTrigger>
      </HStack>
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
