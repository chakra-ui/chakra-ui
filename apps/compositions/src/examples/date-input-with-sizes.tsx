"use client"

import { DateInput, For, Stack } from "@chakra-ui/react"

export const DateInputWithSizes = () => {
  return (
    <Stack gap="4">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <DateInput.Root key={size} size={size} maxWidth="14rem">
            <DateInput.Label>Date of birth (size: {size})</DateInput.Label>
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
