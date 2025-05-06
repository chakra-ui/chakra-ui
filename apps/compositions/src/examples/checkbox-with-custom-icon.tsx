import { Checkbox } from "@sh3yk0-ui/react"
import { HiOutlinePlus } from "react-icons/hi"

export const CheckboxWithCustomIcon = () => {
  return (
    <Checkbox.Root defaultChecked>
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <HiOutlinePlus />
      </Checkbox.Control>
      <Checkbox.Label>With Custom Icon</Checkbox.Label>
    </Checkbox.Root>
  )
}
