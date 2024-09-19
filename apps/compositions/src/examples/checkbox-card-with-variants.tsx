import { For, Stack } from "@chakra-ui/react"
import { CheckboxCard } from "compositions/ui/checkbox-card"

export const CheckboxCardWithVariants = () => {
  return (
    <Stack maxW="320px">
      <For each={["subtle", "outline"]}>
        {(variant) => (
          <CheckboxCard
            label={`Checkbox (${variant})`}
            colorPalette="teal"
            variant={variant}
          />
        )}
      </For>
    </Stack>
  )
}
