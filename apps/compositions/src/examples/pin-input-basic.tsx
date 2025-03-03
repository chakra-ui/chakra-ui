import { Group, PinInput } from "@chakra-ui/react"

export const PinInputBasic = () => {
  return (
    <PinInput.Root>
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
