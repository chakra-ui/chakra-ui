import { HStack, Tag } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu"

export const TagWithoutSnippet = () => {
  return (
    <HStack>
      <Tag.Root>
        <Tag.Label>Top Rated</Tag.Label>
      </Tag.Root>
      <Tag.Root>
        <Tag.StartElement>
          <LuArrowRight />
        </Tag.StartElement>
        <Tag.Label>Tag 2</Tag.Label>
      </Tag.Root>
    </HStack>
  )
}
