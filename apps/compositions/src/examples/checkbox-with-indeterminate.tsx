import { Checkbox, Stack } from "@chakra-ui/react"

const variants = ["outline", "subtle"] as const

export const CheckboxWithIndeterminate = () => {
  return (
    <Stack>
      {variants.map((variant, index) => (
        <Checkbox.Root
          key={index}
          defaultChecked="indeterminate"
          variant={variant}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>Indeterminate</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
}
