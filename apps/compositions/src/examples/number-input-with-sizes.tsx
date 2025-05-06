import { For, NumberInput, Stack } from "@sh3yk0-ui/react"

export const NumberInputWithSizes = () => {
  return (
    <Stack gap="5" width="200px">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <NumberInput.Root size={size} key={size} defaultValue="10">
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
        )}
      </For>
    </Stack>
  )
}
