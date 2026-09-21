"use client"

import { DateInput } from "@chakra-ui/react"
import { DateFormatter } from "@internationalized/date"

const formatter = new DateFormatter("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})

export const DateInputTimeOnly = () => {
  return (
    <DateInput.Root granularity="minute" formatter={formatter} maxW="sm">
      <DateInput.Label>Appointment time</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
