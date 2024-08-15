import { Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithStates = () => {
  return (
    <Stack>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox defaultChecked disabled>
        Disabled
      </Checkbox>
      <Checkbox readOnly>Readonly</Checkbox>
      <Checkbox invalid>Invalid</Checkbox>
    </Stack>
  )
}
