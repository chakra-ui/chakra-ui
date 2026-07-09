"use client"

import { DateInput, Stack, Text, parseDate } from "@chakra-ui/react"
import { useState } from "react"

export const DateInputControlled = () => {
  const [value, setValue] = useState([parseDate("2026-01-26")])

  return (
    <Stack gap="4" maxWidth="14rem">
      <Text textStyle="sm">
        Selected: {value.map((d) => d.toString()).join(", ") || "None"}
      </Text>

      <DateInput.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <DateInput.Label>Date of birth</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </Stack>
  )
}
