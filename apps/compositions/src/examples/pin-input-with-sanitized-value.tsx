"use client"

import { Clipboard, Field, IconButton, PinInput, Stack } from "@chakra-ui/react"

export const PinInputWithSanitizedValue = () => {
  return (
    <Stack gap="4">
      <Clipboard.Root value="1-2-3-4">
        <Clipboard.ValueText fontFamily="mono" />
        <Clipboard.Trigger asChild>
          <IconButton size="xs" variant="outline">
            <Clipboard.Indicator />
          </IconButton>
        </Clipboard.Trigger>
      </Clipboard.Root>

      <Field.Root>
        <Field.Label>Paste the copied code</Field.Label>
        <PinInput.Root sanitizeValue={(value) => value.replace(/\D/g, "")}>
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
          </PinInput.Control>
        </PinInput.Root>
        <Field.HelperText>
          Dashes are removed before validation.
        </Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
