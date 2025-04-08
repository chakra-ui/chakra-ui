import { For, NativeSelect, Stack } from "@chakra-ui/react"

export const NativeSelectWithSizes = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={["xs", "sm", "md", "lg", "xl"]}>
        {(size) => (
          <NativeSelect.Root key={size} size={size}>
            <NativeSelect.Field placeholder="Select option">
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        )}
      </For>
    </Stack>
  )
}
