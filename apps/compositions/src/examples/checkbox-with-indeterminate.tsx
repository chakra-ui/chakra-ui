import { Checkbox, For, Stack } from "@chakra-ui/react"

export const CheckboxWithIndeterminate = () => {
  return (
    <Stack>
      <For each={["subtle", "outline"]}>
        {(variant) => (
          <Checkbox.Root
            defaultChecked="indeterminate"
            variant={variant}
            key={variant}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>{variant}</Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
    </Stack>
  )
}
