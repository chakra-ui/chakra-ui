import { For, HStack, IconButton, Text, VStack } from "@sh3yk0-ui/react"
import { LuPhone } from "react-icons/lu"

export const IconButtonWithSizes = () => {
  return (
    <HStack wrap="wrap" gap="8">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <VStack key={size}>
            <IconButton
              aria-label="Search database"
              variant="outline"
              size={size}
            >
              <LuPhone />
            </IconButton>
            <Text textStyle="sm">{size}</Text>
          </VStack>
        )}
      </For>
    </HStack>
  )
}
