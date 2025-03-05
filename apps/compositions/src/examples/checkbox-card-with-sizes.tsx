import { CheckboxCard, For, Stack } from "@chakra-ui/react"

export const CheckboxCardWithSizes = () => {
  return (
    <Stack maxW="320px">
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <CheckboxCard.Root size={size} key={size}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>Checkbox {size}</CheckboxCard.Label>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        )}
      </For>
    </Stack>
  )
}
