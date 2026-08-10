import { Group, PinInput, Span } from "@chakra-ui/react"

export const PinInputWithSeparator = () => {
  return (
    <PinInput.Root count={6}>
      <PinInput.HiddenInput />
      <PinInput.Control alignItems="center" gap="3">
        <Group attached>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
        </Group>
        <Span color="fg.subtle">–</Span>
        <Group attached>
          <PinInput.Input index={3} />
          <PinInput.Input index={4} />
          <PinInput.Input index={5} />
        </Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}
