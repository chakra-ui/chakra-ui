import { HStack } from "@chakra-ui/react"
import { Tag } from "compositions/ui/tag"

export const TagWithClose = () => {
  return (
    <HStack>
      <Tag closable>Tag 1</Tag>
      <Tag closable>Tag 2</Tag>
    </HStack>
  )
}
