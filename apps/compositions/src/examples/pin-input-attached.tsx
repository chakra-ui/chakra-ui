import { Group, PinInput } from "@chakra-ui/react"

export const PinInputAttached = () => {
  return (
    <PinInput.Root>
      <PinInput.HiddenInput />
      <PinInput.Control>
        <Group attached>
          {Array.from({ length: 4 }).map((_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}
