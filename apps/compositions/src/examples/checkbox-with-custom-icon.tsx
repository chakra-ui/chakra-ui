import { Checkbox, Stack } from "@chakra-ui/react"
import { HiOutlineCheck, HiOutlinePlus, HiOutlineX } from "react-icons/hi"

const icons = [<HiOutlineCheck />, <HiOutlinePlus />, <HiOutlineX />]

export const CheckboxWithCustomIcon = () => {
  return (
    <Stack>
      {icons.map((icon, index) => (
        <Checkbox.Root key={index}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator checked={icon} />
          </Checkbox.Control>
          <Checkbox.Label>Custom Icon</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}
