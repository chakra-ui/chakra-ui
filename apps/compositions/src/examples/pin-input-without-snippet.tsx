import { PinInput } from "@chakra-ui/react"

export const PinInputWithoutSnippet = () => {
  return (
    <PinInput.Root>
      <PinInput.Label>Enter your OTP</PinInput.Label>
      <PinInput.HiddenInput />
      <PinInput.Control>
        {Array.from({ length: 4 }).map((_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  )
}
