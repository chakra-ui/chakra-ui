import { HStack } from "@chakra-ui/react"
import { Tag } from "compositions/ui/tag"
import { LuFileBadge, LuUserCircle } from "react-icons/lu"

export const TagWithIcon = () => {
  return (
    <HStack>
      <Tag startElement={<LuUserCircle />}>Tag 2</Tag>
      <Tag startElement={<LuFileBadge />}>Top Rated</Tag>
    </HStack>
  )
}
