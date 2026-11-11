import { DateInput, For, Stack } from "@chakra-ui/react"

export const DateInputWithVariants = () => {
  return (
    <Stack gap="4" maxW="sm">
      <For each={["outline", "subtle", "flushed"]}>
        {(variant) => (
          <DateInput.Root key={variant} variant={variant}>
            <DateInput.Label>Date of birth - {variant}</DateInput.Label>
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
