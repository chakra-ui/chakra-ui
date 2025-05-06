import { CheckboxCard } from "@sh3yk0-ui/react"

export const CheckboxCardWithDescription = () => {
  return (
    <CheckboxCard.Root maxW="240px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>Next.js</CheckboxCard.Label>
          <CheckboxCard.Description>Best for apps</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}
