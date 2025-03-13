import { PinInput } from "@chakra-ui/react"

export const PinInputCount = () => {
  return (
    <PinInput.Root>
      <PinInput.HiddenInput />
      <PinInput.Control>
        <PinInput.Input index={0} />
        <PinInput.Input index={1} />
        <PinInput.Input index={2} />
        <PinInput.Input index={3} />
        <PinInput.Input index={4} />
        <PinInput.Input index={5} />
      </PinInput.Control>
    </PinInput.Root>
  )
}
