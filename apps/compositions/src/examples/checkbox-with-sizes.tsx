import { Checkbox, For, Stack } from "@chakra-ui/react"

export const CheckboxWithSizes = () => {
  return (
    <Stack align="flex-start" flex="1" gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <Checkbox.Root defaultChecked size={size} key={size}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Checkbox</Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
    </Stack>
  )
}
