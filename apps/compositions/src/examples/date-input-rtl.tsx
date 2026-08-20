import { DateInput, LocaleProvider } from "@chakra-ui/react"

export const DateInputRtl = () => {
  return (
    <LocaleProvider locale="ar-AE">
      <DateInput.Root maxW="sm">
        <DateInput.Label>تاريخ الميلاد</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput.Root>
    </LocaleProvider>
  )
}
