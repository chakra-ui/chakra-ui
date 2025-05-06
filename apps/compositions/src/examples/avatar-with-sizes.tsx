import { Avatar, For, HStack } from "@sh3yk0-ui/react"

export const AvatarWithSizes = () => {
  return (
    <HStack gap="3">
      <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <Avatar.Root size={size} key={size}>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
        )}
      </For>
    </HStack>
  )
}
