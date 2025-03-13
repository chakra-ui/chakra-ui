import { For, PinInput, Stack } from "@chakra-ui/react"

export const PinInputWithSizes = () => {
  return (
    <Stack gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <PinInput.Root key={size} size={size}>
            <PinInput.HiddenInput />
            <PinInput.Control>
              <PinInput.Input index={0} />
              <PinInput.Input index={1} />
              <PinInput.Input index={2} />
              <PinInput.Input index={3} />
            </PinInput.Control>
          </PinInput.Root>
        )}
      </For>
    </Stack>
  )
}
