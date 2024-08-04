import { For, Stack } from "@chakra-ui/react"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const NativeSelectWithSizes = () => {
  return (
    <Stack gap="4" width="240px">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <NativeSelectRoot size={size} key={size}>
            <NativeSelectField placeholder={`size (${size})`}>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </NativeSelectField>
          </NativeSelectRoot>
        )}
      </For>
    </Stack>
  )
}
