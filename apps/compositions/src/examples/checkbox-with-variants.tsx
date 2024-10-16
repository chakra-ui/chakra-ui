import { For, HStack, Stack, Text } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithVariants = () => {
  return (
    <HStack align="flex-start">
      <For each={["outline", "subtle", "solid"]}>
        {(variant) => (
          <Stack align="flex-start" flex="1" key={variant}>
            <Text>{variant}</Text>
            <Checkbox defaultChecked variant={variant}>
              Checkbox
            </Checkbox>
          </Stack>
        )}
      </For>
    </HStack>
  )
}
