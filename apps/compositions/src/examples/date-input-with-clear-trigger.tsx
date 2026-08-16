"use client"

import { DateInput, IconButton, useDateInputContext } from "@chakra-ui/react"
import { LuX } from "react-icons/lu"

const ClearTrigger = () => {
  const dateInput = useDateInputContext()

  if (!dateInput.value.length) return null

  return (
    <IconButton
      aria-label="Clear date"
      variant="ghost"
      size="xs"
      onClick={() => dateInput.clearValue()}
    >
      <LuX />
    </IconButton>
  )
}

export const DateInputWithClearTrigger = () => {
  return (
    <DateInput.Root maxW="sm">
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control gap="2">
        <DateInput.Segments />
        <ClearTrigger />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
