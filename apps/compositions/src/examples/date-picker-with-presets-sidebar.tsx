"use client"

import { DatePicker, Flex, HStack, Spacer, Span, Stack } from "@chakra-ui/react"
import {
  DateFormatter,
  type DateValue,
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
            <DatePicker.PresetTrigger
              key={preset.label}
              value={[preset.value]}
              height="10"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px="4"
              textStyle="sm"
              gap="1"
            >
              <Span>{preset.label}</Span>
              <Span color="fg.muted" textStyle="sm">
                {formatShortDate(preset.value, preset.display)}
              </Span>
            </DatePicker.PresetTrigger>
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
const tomorrow = now.add({ days: 1 })

const presets = [
  { label: "Today", value: now, display: now.toDate(tz) },
  {
    label: "Tomorrow",
    value: now.add({ days: 1 }),
    display: now.add({ days: 1 }).toDate(tz),
  },
  {
    label: "This weekend",
    value: now.add({ days: (6 - now.toDate(tz).getDay()) % 7 }),
    display: now.add({ days: (6 - now.toDate(tz).getDay()) % 7 }).toDate(tz),
  },
  {
    label: "Next week",
    value: now.add({ weeks: 1 }),
    display: now.add({ weeks: 1 }).toDate(tz),
  },
  {
    label: "Next weekend",
    value: now.add({
      days: ((6 - now.toDate(tz).getDay()) % 7) + 7,
    }),
    display: now
      .add({ days: ((6 - now.toDate(tz).getDay()) % 7) + 7 })
      .toDate(tz),
  },
  {
    label: "2 weeks",
    value: now.add({ weeks: 2 }),
    display: now.add({ weeks: 2 }).toDate(tz),
  },
  {
    label: "4 weeks",
    value: now.add({ weeks: 4 }),
    display: now.add({ weeks: 4 }).toDate(tz),
  },
]

const weekdayFormatter = new DateFormatter("en-US", { weekday: "short" })
const shortDateFormatter = new DateFormatter("en-US", {
  day: "numeric",
  month: "short",
})

const formatShortDate = (value: DateValue, display: Date) => {
  if (isToday(value, tz)) return weekdayFormatter.format(display)
  if (isSameDay(value, tomorrow)) return weekdayFormatter.format(display)
  return shortDateFormatter.format(display)
}
