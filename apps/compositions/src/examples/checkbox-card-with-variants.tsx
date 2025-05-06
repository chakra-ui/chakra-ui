import { CheckboxCard, For, Stack } from "@sh3yk0-ui/react"

export const CheckboxCardWithVariants = () => {
  return (
    <Stack maxW="320px">
      <For each={["subtle", "surface", "outline"]}>
        {(variant) => (
          <CheckboxCard.Root
            defaultChecked
            key={variant}
            variant={variant}
            colorPalette="teal"
          >
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Label>Checkbox {variant}</CheckboxCard.Label>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        )}
      </For>
    </Stack>
  )
}
