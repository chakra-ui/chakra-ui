import { DateInput } from "@chakra-ui/react"

export const DateInputRtl = () => {
  return (
    <DateInput.Root dir="rtl">
      <DateInput.Label>تاريخ الميلاد</DateInput.Label>
      <DateInput.Control>
        <DateInput.Segments />
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
