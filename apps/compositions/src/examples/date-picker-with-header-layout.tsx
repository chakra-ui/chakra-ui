"use client"

import { DatePicker, HStack, Portal, Spacer } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithHeaderLayout = () => {
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
              <HStack>
                <DatePicker.RangeText ps="4" />
                <Spacer />
                <DatePicker.PrevTrigger />
                <DatePicker.NextTrigger />
              </HStack>
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}
