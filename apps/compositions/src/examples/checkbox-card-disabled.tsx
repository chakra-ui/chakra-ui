import { CheckboxCard } from "@chakra-ui/react"

export const CheckboxCardDisabled = () => {
  return (
    <CheckboxCard.Root disabled maxW="320px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>Disabled</CheckboxCard.Label>
          <CheckboxCard.Description>
            This is a disabled checkbox
          </CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}
