"use client"

import { Checkbox, DateInput, HStack, Stack } from "@chakra-ui/react"
import { parseZonedDateTime } from "@internationalized/date"
import { useState } from "react"

export const DateInputTimeZone = () => {
  const [hour12, setHour12] = useState(true)
  const [hideTimeZone, setHideTimeZone] = useState(false)

  return (
    <Stack gap="4" maxW="sm">
      <DateInput.Root
        defaultValue={[
          parseZonedDateTime("2026-02-03T08:45:00[America/Los_Angeles]"),
        ]}
        timeZone="America/Los_Angeles"
        granularity="minute"
        hourCycle={hour12 ? 12 : 24}
        hideTimeZone={hideTimeZone}
      >
        <DateInput.Label>Meeting time</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>

      <HStack gap="4">
        <Checkbox.Root
          size="sm"
          checked={hour12}
          onCheckedChange={(e) => setHour12(!!e.checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>12 hour</Checkbox.Label>
        </Checkbox.Root>
        <Checkbox.Root
          size="sm"
          checked={hideTimeZone}
          onCheckedChange={(e) => setHideTimeZone(!!e.checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Hide time zone</Checkbox.Label>
        </Checkbox.Root>
      </HStack>
    </Stack>
  )
}
