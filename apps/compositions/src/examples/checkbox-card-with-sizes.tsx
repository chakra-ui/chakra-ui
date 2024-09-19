import { For, Stack } from "@chakra-ui/react"
import { CheckboxCard } from "compositions/ui/checkbox-card"

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <For each={["sm", "md", "lg"]}>
        {(size) => <CheckboxCard label={`Checkbox (${size})`} size={size} />}
      </For>
    </Stack>
  )
}
