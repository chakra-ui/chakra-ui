import { Badge, HStack, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardAddon,
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithAddon = () => {
  return (
    <CheckboxCardRoot width="300px">
      <CheckboxCardControl>
        <Stack gap="0" flex="1">
          <CheckboxCardLabel>With Addon</CheckboxCardLabel>
          <Text>Some description</Text>
        </Stack>
      </CheckboxCardControl>
      <CheckboxCardAddon>
        <HStack>
          Some supporting text
          <Badge variant="solid">New</Badge>
        </HStack>
      </CheckboxCardAddon>
    </CheckboxCardRoot>
  )
}
