"use client"

import { DateInput } from "@chakra-ui/react"
import { parseDate } from "@internationalized/date"

export const DateInputDefaultValue = () => {
  return (
    <DateInput.Root defaultValue={[parseDate("2026-01-26")]} maxW="sm">
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
