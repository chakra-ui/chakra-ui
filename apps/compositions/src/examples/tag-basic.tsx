import { HStack } from "@chakra-ui/react"
import { Tag } from "compositions/ui/tag"

export const TagBasic = () => {
  return (
    <HStack>
      <Tag>Plain Tag</Tag>
      <Tag closable>Closable Tag</Tag>
    </HStack>
  )
}
