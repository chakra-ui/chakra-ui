import { For, NativeSelect, Stack } from "@chakra-ui/react"

export const NativeSelectWithVariants = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={["outline", "subtle", "plain"]}>
        {(variant) => (
          <NativeSelect.Root key={variant} variant={variant}>
            <NativeSelect.Field placeholder={`variant (${variant})`}>
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
