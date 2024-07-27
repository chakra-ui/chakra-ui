import { Badge, HStack } from "@chakra-ui/react"

export const BadgeWithSizes = () => {
  return (
    <HStack>
      <Badge size="xs">New</Badge>
      <Badge size="sm">New</Badge>
      <Badge size="md">New</Badge>
      <Badge size="lg">New</Badge>
    </HStack>
  )
}
