"use client"

import { DatePicker, Flex, HStack, Spacer, Span, Stack } from "@chakra-ui/react"
import type { DateValue } from "@chakra-ui/react"
import {
  DateFormatter,
  getLocalTimeZone,
  isSameDay,
  isToday,
  today,
} from "@internationalized/date"

export const DatePickerWithPresetsSidebar = () => {
  return (
    <DatePicker.Root inline fixedWeeks width="fit-content" borderWidth="1px">
      <Flex>
        <Stack gap="0" minW="2xs" borderEndWidth="1px" py="2">
          {presets.map((preset) => (
            <DatePicker.Context key={preset.label}>
              {(ctx) => (
                <DatePicker.PresetTrigger
                  value={[preset.value]}
                  height="10"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px="4"
                  textStyle="sm"
                  gap="1"
                  data-selected={
                    ctx.value.length > 0 &&
                    preset.value.compare(ctx.value[0]) === 0
                      ? ""
                      : undefined
                  }
                  _selected={{
                    layerStyle: "fill.subtle",
                  }}
                >
                  <Span>{preset.label}</Span>
                  <Span color="fg.muted" textStyle="sm">
                    {formatShortDate(preset.value, preset.value.toDate(tz))}
                  </Span>
                </DatePicker.PresetTrigger>
              )}
            </DatePicker.Context>
          ))}
        </Stack>

        <DatePicker.View view="day" p="3">
          <HStack justify="space-between" gap="0">
            <DatePicker.RangeText ps="4" fontWeight="medium" />
            <Spacer />
            <DatePicker.PrevTrigger />
            <DatePicker.NextTrigger />
          </HStack>
          <DatePicker.DayTable />
        </DatePicker.View>
      </Flex>
    </DatePicker.Root>
  )
}

const tz = getLocalTimeZone()
const now = today(tz)

const presets = [
  { label: "Today", value: now },
  { label: "Tomorrow", value: now.add({ days: 1 }) },
  { label: "Next week", value: now.add({ weeks: 1 }) },
  { label: "2 weeks", value: now.add({ weeks: 2 }) },
  { label: "4 weeks", value: now.add({ weeks: 4 }) },
]

const weekdayFormatter = new DateFormatter("en-US", { weekday: "short" })
const shortDateFormatter = new DateFormatter("en-US", {
  day: "numeric",
  month: "short",
})

const tomorrow = now.add({ days: 1 })
const formatShortDate = (value: DateValue, display: Date) => {
  if (isToday(value, tz)) return weekdayFormatter.format(display)
  if (isSameDay(value, tomorrow)) return weekdayFormatter.format(display)
  return shortDateFormatter.format(display)
}
