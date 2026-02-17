"use client"

import { Badge, DatePicker, For, Stack } from "@chakra-ui/react"

export const DatePickerInlineWithSizes = () => {
  return (
    <Stack gap={8} direction="row" flexWrap="wrap">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <Stack key={size} gap={2} align="flex-start">
            <Badge variant="outline" width="fit-content">
              {size}
            </Badge>
            <DatePicker.Root inline width="fit-content" size={size}>
              <DatePicker.Content unstyled>
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
            </DatePicker.Root>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
