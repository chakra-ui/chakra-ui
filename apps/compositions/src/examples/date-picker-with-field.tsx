"use client"

import { Button, DatePicker, Field, Portal, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerWithField = () => {
  const [invalid, setInvalid] = useState(false)
  const toggleInvalid = () => setInvalid((prev) => !prev)

  return (
    <Stack gap="6" align="flex-start" maxWidth="20rem">
      <Button onClick={toggleInvalid} variant="outline" size="sm">
        Toggle Invalid
      </Button>
      <Field.Root invalid={invalid}>
        <Field.Label>Date of birth</Field.Label>
        <Field.Context>
          {(ctx) => (
            <DatePicker.Root
              invalid={ctx.invalid}
              ids={{ label: () => ctx.ids.label, input: () => ctx.ids.control }}
            >
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
          )}
        </Field.Context>
        <Field.ErrorText>Date of birth is required</Field.ErrorText>
      </Field.Root>
    </Stack>
  )
}
