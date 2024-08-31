import { Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardBasic = () => {
  return (
    <CheckboxCardRoot maxW="240px">
      <CheckboxCardControl>
        <Stack gap="0" flex="1">
          <CheckboxCardLabel>Next.js</CheckboxCardLabel>
          <Text color="fg.subtle">Best for apps</Text>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  )
}
