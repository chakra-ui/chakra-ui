import { NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithDisabled = () => (
  <NativeSelect.Root disabled>
    <NativeSelect.Field placeholder="Select option">
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="angular">Angular</option>
      <option value="svelte">Svelte</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
)
