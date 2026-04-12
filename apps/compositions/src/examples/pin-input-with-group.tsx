import { PinInput } from "@chakra-ui/react"

export const PinInputWithGroup = () => {
  return (
    <PinInput.Root>
      <PinInput.HiddenInput />
      <PinInput.Control>
        <PinInput.Group>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
        </PinInput.Group>

        <PinInput.Separator aria-hidden="true" alignSelf="center" px="2">
          –
        </PinInput.Separator>
        <PinInput.Group>
          <PinInput.Input index={3} />
          <PinInput.Input index={4} />
          <PinInput.Input index={5} />
        </PinInput.Group>
      </PinInput.Control>
    </PinInput.Root>
  )
}
