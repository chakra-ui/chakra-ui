import { Checkbox, Stack } from "@chakra-ui/react"

export const CheckboxWithStates = () => {
  return (
    <Stack>
      <Checkbox.Root disabled>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Disabled</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root defaultChecked disabled>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Disabled</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root readOnly>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Readonly</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root invalid>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Invalid</Checkbox.Label>
      </Checkbox.Root>
    </Stack>
  )
}
