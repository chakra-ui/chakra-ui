"use client"

import { DateInput } from "@chakra-ui/react"
import { parseDate } from "@internationalized/date"

export const DateInputLeadingZeros = () => {
  return (
    <DateInput.Root
      shouldForceLeadingZeros
      defaultValue={[parseDate("2026-01-05")]}
      maxW="sm"
    >
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
