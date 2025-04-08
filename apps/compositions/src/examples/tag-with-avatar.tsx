import { Avatar, For, HStack, Tag } from "@chakra-ui/react"

export const TagWithAvatar = () => {
  return (
    <HStack>
      <For each={["sm", "md", "lg", "xl"]}>
        {(size) => (
          <Tag.Root key={size} size={size} rounded="full">
            <Tag.StartElement>
              <Avatar.Root size="full">
                <Avatar.Image src="https://i.pravatar.cc/300?u=1" />
                <Avatar.Fallback name="John Doe" />
              </Avatar.Root>
            </Tag.StartElement>
            <Tag.Label>Emily {size}</Tag.Label>
          </Tag.Root>
        )}
      </For>
    </HStack>
  )
}
