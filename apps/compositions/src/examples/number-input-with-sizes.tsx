import { For, HStack } from "@chakra-ui/react"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithSizes = () => {
  return (
    <HStack align="flex-start">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <NumberInputRoot size={size} key={size} defaultValue="10">
            <NumberInputField />
          </NumberInputRoot>
        )}
      </For>
    </HStack>
  )
}
