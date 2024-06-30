import { Badge, CheckboxCard, Stack, Text } from "@chakra-ui/react"

export const ChecboxCardWithAddon = () => {
  return (
    <CheckboxCard.Root width="300px" colorPalette="purple">
      <CheckboxCard.Control>
        <Stack gap="0" flex="1">
          <CheckboxCard.Label>With Addon</CheckboxCard.Label>
          <Text>Some description</Text>
        </Stack>

        <CheckboxCard.HiddenInput />
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>

      <CheckboxCard.Addon>
        Some supporting text
        <Badge ms="2" colorPalette="purple">
          New
        </Badge>
      </CheckboxCard.Addon>
    </CheckboxCard.Root>
  )
}
