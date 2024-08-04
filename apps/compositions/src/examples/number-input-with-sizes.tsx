import { For, Stack } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithSizes = () => {
  return (
    <Stack gap="5" width="200px">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <NumberInputRoot size={size} key={size} defaultValue="10">
            <NumberInputField />
          </NumberInputRoot>
        )}
      </For>
    </Stack>
  )
}
