import { For, Group, PinInput, Stack } from "@chakra-ui/react"

export const PinInputWithSizes = () => {
  return (
    <Stack gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <PinInput.Root key={size} size={size}>
            <PinInput.HiddenInput />
            <PinInput.Control>
              <Group>
                {Array.from({ length: 4 }).map((_, index) => (
                  <PinInput.Input key={index} index={index} />
                ))}
              </Group>
            </PinInput.Control>
          </PinInput.Root>
        )}
      </For>
    </Stack>
  )
}
