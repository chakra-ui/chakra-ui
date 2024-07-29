import { Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithSizes = () => {
  return (
    <Stack align="flex-start" flex="1">
      <Checkbox defaultChecked size="sm">
        Checkbox
      </Checkbox>
      <Checkbox defaultChecked size="md">
        Checkbox
      </Checkbox>
      <Checkbox defaultChecked size="lg">
        Checkbox
      </Checkbox>
    </Stack>
  )
}
