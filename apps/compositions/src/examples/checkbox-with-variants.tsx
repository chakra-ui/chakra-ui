import { Checkbox, For, HStack, Stack, Text } from "@chakra-ui/react"

export const CheckboxWithVariants = () => {
  return (
    <HStack align="flex-start">
      <For each={["outline", "subtle", "solid"]}>
        {(variant) => (
          <Stack align="flex-start" flex="1" key={variant}>
            <Text>{variant}</Text>
            <Checkbox.Root defaultChecked variant={variant}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Checkbox</Checkbox.Label>
            </Checkbox.Root>
          </Stack>
        )}
      </For>
    </HStack>
  )
}
