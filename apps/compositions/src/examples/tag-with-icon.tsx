import { HStack, Tag } from "@chakra-ui/react"
import { LuCircleUser, LuFileBadge } from "react-icons/lu"

export const TagWithIcon = () => {
  return (
    <HStack>
      <Tag.Root>
        <Tag.StartElement>
          <LuCircleUser />
        </Tag.StartElement>
        <Tag.Label>Tag 1</Tag.Label>
      </Tag.Root>
      <Tag.Root>
        <Tag.StartElement>
          <LuFileBadge />
        </Tag.StartElement>
        <Tag.Label>Top Rated</Tag.Label>
      </Tag.Root>
      <Tag.Root>
        <Tag.Label>Tag 2</Tag.Label>
        <Tag.EndElement>
          <LuCircleUser />
        </Tag.EndElement>
      </Tag.Root>
    </HStack>
  )
}
