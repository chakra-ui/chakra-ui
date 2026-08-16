"use client"

import { DateInput, parseDate } from "@chakra-ui/react"

export const DateInputMinMax = () => {
  return (
    <DateInput.Root
      min={parseDate("2026-01-01")}
      max={parseDate("2026-12-31")}
      maxW="sm"
    >
      <DateInput.Label>Appointment date (2026 only)</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
