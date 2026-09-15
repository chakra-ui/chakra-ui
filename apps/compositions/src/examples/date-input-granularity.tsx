import { DateInput } from "@chakra-ui/react"

export const DateInputGranularity = () => {
  return (
    <DateInput.Root granularity="minute" maxW="sm">
      <DateInput.Label>Appointment</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
