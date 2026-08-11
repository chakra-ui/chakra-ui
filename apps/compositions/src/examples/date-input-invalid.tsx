"use client"

import { DateInput } from "@chakra-ui/react"

export const DateInputInvalid = () => {
  return (
    <DateInput.Root invalid>
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
