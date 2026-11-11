import { DateInput } from "@chakra-ui/react"

export const DateInputLocale = () => {
  return (
    <DateInput.Root locale="de-DE" maxW="sm">
      <DateInput.Label>Geburtsdatum</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
