import { HStack, Tag } from "@chakra-ui/react"
import { LuActivity } from "react-icons/lu"

export const TagWithClose = () => {
  return (
    <HStack>
      <Tag.Root>
        <Tag.StartElement>
          <LuActivity />
        </Tag.StartElement>
        <Tag.Label>Tag 1</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger />
        </Tag.EndElement>
      </Tag.Root>
      <Tag.Root>
        <Tag.Label>Tag 2</Tag.Label>
        <Tag.EndElement>
          <Tag.CloseTrigger />
        </Tag.EndElement>
      </Tag.Root>
    </HStack>
  )
}
