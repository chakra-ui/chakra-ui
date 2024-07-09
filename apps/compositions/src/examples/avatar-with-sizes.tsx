import { For, HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

const getImage = (id: number) =>
  `https://randomuser.me/api/portraits/men/${id}.jpg`

export const AvatarWithSizes = () => {
  return (
    <HStack gap="3">
      <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <Avatar key={size} size={size} name="Franc Mena" src={getImage(46)} />
        )}
      </For>
    </HStack>
  )
}
