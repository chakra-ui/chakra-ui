import { Group, PinInput } from "@chakra-ui/react"

export const PinInputWithOtp = () => {
  return (
    <PinInput.Root otp>
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
