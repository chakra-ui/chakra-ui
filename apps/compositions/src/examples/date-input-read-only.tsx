"use client"

import { DateInput, parseDate } from "@chakra-ui/react"

export const DateInputReadOnly = () => {
  return (
    <DateInput.Root
      readOnly
      defaultValue={[parseDate("2026-01-26")]}
      maxWidth="14rem"
    >
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
