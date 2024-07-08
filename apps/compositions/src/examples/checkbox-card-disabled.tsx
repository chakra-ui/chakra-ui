import { Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardDisabled = () => {
  return (
    <CheckboxCardRoot disabled>
      <CheckboxCardControl>
        <Stack gap="0">
          <CheckboxCardLabel>Disabled</CheckboxCardLabel>
          <Text>This is a disabled checkbox</Text>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  )
}
