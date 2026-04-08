import { Badge, HStack } from "@chakra-ui/react-next"

export const BadgeWithSizes = () => {
  return (
    <HStack gap="2">
      <Badge size="xs" variant="solid" bg="red">
        New
      </Badge>
      <Badge size="sm" bg="blue">
        New
      </Badge>
      <Badge size="md" bg="green">
        New
      </Badge>
      <Badge size="lg" bg="yellow">
        New
      </Badge>
    </HStack>
  )
}
