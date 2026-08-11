import { DateInput } from "@chakra-ui/react"

export const DateInputBasic = () => {
  return (
    <DateInput.Root>
      <DateInput.Label>Date of birth</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
