import { For, Stack } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <CheckboxCardRoot size={size}>
            <CheckboxCardControl>
              <CheckboxCardLabel>Checkbox ({size})</CheckboxCardLabel>
            </CheckboxCardControl>
          </CheckboxCardRoot>
        )}
      </For>
    </Stack>
  )
}
