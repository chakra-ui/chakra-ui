import { DateInput } from "@chakra-ui/react"

export const DateInputDisabled = () => {
  return (
    <DateInput.Root disabled maxW="sm">
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
