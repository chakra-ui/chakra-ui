import { Stack } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <CheckboxCardRoot size="sm">
        <CheckboxCardControl>
          <CheckboxCardLabel>Checkbox (sm)</CheckboxCardLabel>
        </CheckboxCardControl>
      </CheckboxCardRoot>

      <CheckboxCardRoot size="md">
        <CheckboxCardControl>
          <CheckboxCardLabel>Checkbox (md)</CheckboxCardLabel>
        </CheckboxCardControl>
      </CheckboxCardRoot>

      <CheckboxCardRoot size="lg">
        <CheckboxCardControl>
          <CheckboxCardLabel>Checkbox (lg)</CheckboxCardLabel>
        </CheckboxCardControl>
      </CheckboxCardRoot>
    </Stack>
  )
}
