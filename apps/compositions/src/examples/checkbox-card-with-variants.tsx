import { For, Stack } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithVariants = () => {
  return (
    <Stack maxW="320px">
      <For each={["subtle", "outline"]}>
        {(variant) => (
          <CheckboxCardRoot colorPalette="teal" variant={variant}>
            <CheckboxCardControl>
              <CheckboxCardLabel>Checkbox ({variant})</CheckboxCardLabel>
            </CheckboxCardControl>
          </CheckboxCardRoot>
        )}
      </For>
    </Stack>
  )
}
