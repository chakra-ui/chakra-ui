import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

const getImage = (id: number) =>
  `https://randomuser.me/api/portraits/men/${id}.jpg`

export const AvatarWithShape = () => {
  return (
    <HStack>
      <Avatar name="Random User" src={getImage(40)} shape="square" />
      <Avatar name="Random User" src={getImage(54)} shape="rounded" />
      <Avatar name="Random User" src={getImage(42)} shape="full" />
    </HStack>
  )
}
