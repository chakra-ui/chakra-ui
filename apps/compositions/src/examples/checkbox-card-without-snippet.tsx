import { CheckboxCard } from "@chakra-ui/react"

export const CheckboxCardWithoutSnippet = () => {
  return (
    <CheckboxCard.Root maxW="240px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
      <CheckboxCard.Content>
        <CheckboxCard.Label>Next.js</CheckboxCard.Label>
        <CheckboxCard.Description>Best for apps</CheckboxCard.Description>
      </CheckboxCard.Content>
    </CheckboxCard.Root>
  )
}
