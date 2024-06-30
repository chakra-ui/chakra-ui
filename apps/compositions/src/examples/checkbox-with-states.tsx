import { Checkbox, Stack } from "@chakra-ui/react"

const states = [
  {
    disabled: true,
    label: "Disabled",
  },
  {
    readOnly: true,
    label: "Readonly",
  },
  {
    invalid: true,
    label: "Invalid",
  },
] as const

export const CheckboxWithStates = () => {
  return (
    <Stack>
      {states.map(({ label, ...state }, index) => (
        <Checkbox.Root key={index} {...state}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{label}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}
