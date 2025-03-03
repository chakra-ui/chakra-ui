import { Badge, CheckboxCard, HStack } from "@chakra-ui/react"

export const CheckboxCardWithAddon = () => {
  return (
    <CheckboxCard.Root maxW="300px">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>With Addon</CheckboxCard.Label>
          <CheckboxCard.Description>Some description</CheckboxCard.Description>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
      <CheckboxCard.Addon>
        <HStack>
          Some supporting text
          <Badge variant="solid">New</Badge>
        </HStack>
      </CheckboxCard.Addon>
    </CheckboxCard.Root>
  )
}
