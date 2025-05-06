import { CheckboxCard } from "@sh3yk0-ui/react"

export const CheckboxCardBasic = () => {
  return (
    <CheckboxCard.Root maxW="240px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Label>Next.js</CheckboxCard.Label>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}
