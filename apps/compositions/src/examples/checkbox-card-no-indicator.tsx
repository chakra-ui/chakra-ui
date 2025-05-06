import { CheckboxCard, HStack } from "@sh3yk0-ui/react"

export const CheckboxCardNoIndicator = () => {
  return (
    <HStack>
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>Chakra UI</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>

      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>Next.js</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </HStack>
  )
}
