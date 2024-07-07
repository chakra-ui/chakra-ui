import { Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithIndeterminate = () => {
  return (
    <Stack>
      <Checkbox defaultChecked="indeterminate" variant="subtle">
        Indeterminate
      </Checkbox>
      <Checkbox defaultChecked="indeterminate" variant="outline">
        Checked
      </Checkbox>
    </Stack>
  )
}
