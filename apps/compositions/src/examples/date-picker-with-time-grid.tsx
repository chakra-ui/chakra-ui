"use client"

import {
  Box,
  Button,
  Center,
  DatePicker,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  type DateValue,
  Time,
  getLocalTimeZone,
  isToday,
  isWeekend,
  today,
} from "@internationalized/date"
import { useState } from "react"
import { LuGlobe } from "react-icons/lu"

const tz = getLocalTimeZone()

export const DatePickerWithTimeGrid = () => {
  const [selectedDate, setSelectedDate] = useState<DateValue[]>([])
  const [selectedTime, setSelectedTime] = useState<Time | null>(null)

  const date = selectedDate[0]
  const slots = date ? generateTimeSlots(date) : []
  const nativeDate = date?.toDate(tz)

  const handleDateChange = (details: { value: DateValue[] }) => {
    setSelectedDate(details.value)
    setSelectedTime(null)
  }

  const handleTimeClick = (time: Time) => {
    setSelectedTime(
      selectedTime && selectedTime.compare(time) === 0 ? null : time,
    )
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      borderWidth="1px"
      rounded="xl"
      overflow="hidden"
      width="fit-content"
    >
      {/* Calendar */}
      <Box
        borderEndWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0" }}
      >
        <Stack gap="0" px="5" py="5">
          <Text fontWeight="semibold" textStyle="lg">
            Select a Date
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Pick a day for your meeting
          </Text>
        </Stack>

        <DatePicker.Root
          inline
          value={selectedDate}
          onValueChange={handleDateChange}
          fixedWeeks
          min={today(tz)}
          isDateUnavailable={(date) => isWeekend(date, "en-US")}
          width="fit-content"
        >
          <DatePicker.Content unstyled px="3" pb="4">
            <DatePicker.View view="day">
              <HStack justify="space-between" gap="0">
                <DatePicker.PrevTrigger />
                <DatePicker.RangeText fontWeight="medium" textStyle="sm" />
                <DatePicker.NextTrigger />
              </HStack>
              <DatePicker.DayTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Root>

        <HStack px="5" pb="4" color="fg.muted" textStyle="xs">
          <LuGlobe />
          <span>{tz}</span>
        </HStack>
      </Box>

      {/* Time slots */}
      <Stack minW="240px" flex="1">
        {date && nativeDate ? (
          <Stack gap="0" flex="1">
            <Stack gap="0" px="5" pt="5" pb="3">
              <Text fontWeight="semibold">
                {isToday(date, tz) ? "Today" : formatWeekday(nativeDate)}
              </Text>
              <Text textStyle="sm" color="fg.muted">
                {formatMonthDay(nativeDate)}
              </Text>
            </Stack>

            <TimeGrid
              slots={slots}
              selectedTime={selectedTime}
              onTimeClick={handleTimeClick}
            />
          </Stack>
        ) : (
          <Center height="full" px="8" py="10" color="fg.muted">
            <Stack align="center" gap="1" textAlign="center">
              <Text textStyle="sm" fontWeight="medium">
                Select a date
              </Text>
              <Text textStyle="xs">Available time slots will appear here</Text>
            </Stack>
          </Center>
        )}
      </Stack>
    </Flex>
  )
}

/* --- TimeGrid component --- */

interface TimeGridProps {
  slots: Time[]
  selectedTime: Time | null
  onTimeClick: (time: Time) => void
}

const TimeGrid = (props: TimeGridProps) => {
  const { slots, selectedTime, onTimeClick } = props

  return (
    <Stack gap="2" px="4" pb="4" flex="1" overflowY="auto" maxH="380px">
      {slots.map((time) => {
        const isSelected =
          selectedTime != null && selectedTime.compare(time) === 0
        const label = formatTime(time)

        return (
          <Button
            key={label}
            variant={isSelected ? "solid" : "outline"}
            size="sm"
            rounded="lg"
            fontWeight="semibold"
            onClick={() => onTimeClick(time)}
          >
            {label}
          </Button>
        )
      })}
    </Stack>
  )
}

/* --- Utilities --- */

const generateTimeSlots = (date: DateValue): Time[] => {
  const day = date.toDate(tz).getDay()
  const slots: Time[] = []
  const start = 9
  const end = day === 5 ? 14 : 17

  for (let hour = start; hour < end; hour++) {
    slots.push(new Time(hour, 0))
    if (hour < end - 1 || day !== 5) {
      slots.push(new Time(hour, 30))
    }
  }

  // simulate some unavailable slots
  const seed = date.day + date.month
  return slots.filter((_, i) => (i + seed) % 5 !== 0)
}

const formatTime = (time: Time) =>
  `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`

const formatWeekday = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "long" })

const formatMonthDay = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
