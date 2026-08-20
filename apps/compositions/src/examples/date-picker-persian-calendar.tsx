"use client"

import { Box, DatePicker, LocaleProvider, Portal } from "@chakra-ui/react"
import { PersianCalendar, today } from "@internationalized/date"
import { LuCalendar } from "react-icons/lu"

export const DatePickerPersianCalendar = () => {
  return (
    <LocaleProvider locale="fa-IR">
      <Box dir="rtl">
        <DatePicker.Root
          locale="fa-IR"
          createCalendar={() => new PersianCalendar()}
          defaultValue={[today("Asia/Tehran")]}
          startOfWeek={6}
          maxWidth="20rem"
        >
          <DatePicker.Label>تاریخ را انتخاب کنید</DatePicker.Label>

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
              <DatePicker.Content dir="rtl">
                <DatePicker.View view="day">
                  <DatePicker.Header dir={"ltr"} />
                  <DatePicker.DayTable />
                </DatePicker.View>

                <DatePicker.View view="month">
                  <DatePicker.Header dir={"ltr"} />
                  <DatePicker.MonthTable />
                </DatePicker.View>

                <DatePicker.View view="year">
                  <DatePicker.Header dir={"ltr"} />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>
      </Box>
    </LocaleProvider>
  )
}
