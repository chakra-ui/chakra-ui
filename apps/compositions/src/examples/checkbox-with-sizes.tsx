import { For, Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithSizes = () => {
  return (
    <Stack align="flex-start" flex="1" gap="4">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <Checkbox defaultChecked size={size} key={size}>
            Checkbox
          </Checkbox>
        )}
      </For>
    </Stack>
  )
}
