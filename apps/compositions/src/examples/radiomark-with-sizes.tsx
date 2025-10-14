import { For, HStack, Radiomark } from "@chakra-ui/react"

export const RadiomarkWithSizes = () => {
  return (
    <HStack gap={4} alignItems="center">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => <Radiomark key={size} size={size} checked />}
      </For>
    </HStack>
  )
}
