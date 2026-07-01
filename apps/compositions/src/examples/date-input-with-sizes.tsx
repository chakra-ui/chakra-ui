"use client"

import { DateInput, For, Stack } from "@chakra-ui/react"

export const DateInputWithSizes = () => {
  return (
    <Stack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <DateInput.Root key={size} size={size} maxWidth="14rem">
            <DateInput.Label>Date of birth</DateInput.Label>
            <DateInput.Control>
              <DateInput.Segments />
            </DateInput.Control>
            <DateInput.HiddenInput />
          </DateInput.Root>
        )}
      </For>
    </Stack>
  )
}
