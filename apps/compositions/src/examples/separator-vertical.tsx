import { HStack, Separator, Text } from "@sh3yk0-ui/react"

export const SeparatorVertical = () => {
  return (
    <HStack gap="4">
      <Text>First</Text>
      <Separator orientation="vertical" height="4" />
      <Text>Second</Text>
    </HStack>
  )
}
