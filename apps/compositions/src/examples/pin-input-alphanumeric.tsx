import { Group, PinInput } from "@chakra-ui/react"

export const PinInputAlphanumeric = () => {
  return (
    <PinInput.Root type="alphanumeric">
      <PinInput.HiddenInput />
      <PinInput.Control>
        <Group>
          {Array.from({ length: 4 }).map((_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}
