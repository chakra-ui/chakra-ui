"use client"

import { DatePicker, Portal, Tag, Wrap, type WrapProps } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerMultiSelection = () => {
  return (
    <DatePicker.Root selectionMode="multiple" maxWidth="sm">
      <DatePicker.Label>Date of birth</DatePicker.Label>

      <DatePicker.Control>
        <DatePickerValueContainer>
          <DatePickerValue />
        </DatePickerValueContainer>

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

const DatePickerValue = () => {
  return (
    <DatePicker.ValueText placeholder="Select dates...">
      {({ value, index, remove }) => (
        <Tag.Root key={index} size="lg" variant="subtle">
          <Tag.Label>{formatWithDay(value)}</Tag.Label>
          <Tag.EndElement>
            <Tag.CloseTrigger onClick={remove} />
          </Tag.EndElement>
        </Tag.Root>
      )}
    </DatePicker.ValueText>
  )
}

const DatePickerValueContainer = (props: WrapProps) => {
  return (
    <Wrap
      gap="2"
      borderWidth="1px"
      minH="10"
      display="flex"
      alignItems="center"
      width="full"
      borderRadius="l2"
      textStyle="sm"
      py="1.5"
      ps="2.5"
      pe="8"
      {...props}
    />
  )
}
