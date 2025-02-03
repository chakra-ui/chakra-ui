import { For, HStack, Tag } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

export const TagWithAvatar = () => {
  return (
    <HStack>
      <For each={["sm", "md", "lg", "xl"]}>
        {(size) => (
          <Tag.Root key={size} size={size} rounded="full">
            <Tag.StartElement>
              <Avatar
                size="full"
                src="https://i.pravatar.cc/300?u=1"
                name="John Doe"
              />
            </Tag.StartElement>
            <Tag.Label>Emily {size}</Tag.Label>
          </Tag.Root>
        )}
      </For>
    </HStack>
  )
}
