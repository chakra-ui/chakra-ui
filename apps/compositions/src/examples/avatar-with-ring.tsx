import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

const getImage = (id: number) =>
  `https://randomuser.me/api/portraits/men/${id}.jpg`

const images = [getImage(70), getImage(54), getImage(42)]

export const AvatarWithRing = () => {
  return (
    <HStack gap="4">
      {images.map((src, index) => (
        <Avatar
          key={index}
          name="Random"
          src={src}
          outlineWidth="2px"
          outlineColor="colorPalette.500"
          outlineOffset="2px"
          outlineStyle="solid"
        />
      ))}
    </HStack>
  )
}
