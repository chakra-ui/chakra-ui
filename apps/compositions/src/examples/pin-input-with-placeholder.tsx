import { PinInput } from "@chakra-ui/react"

export const PinInputWithPlaceholder = () => {
  return (
    <PinInput.Root placeholder="🥳">
      <PinInput.HiddenInput />
      <PinInput.Control>
        <PinInput.Input index={0} />
        <PinInput.Input index={1} />
        <PinInput.Input index={2} />
        <PinInput.Input index={3} />
      </PinInput.Control>
    </PinInput.Root>
  )
}
