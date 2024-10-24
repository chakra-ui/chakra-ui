import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export const AvatarWithRandomColor = () => {
  return (
    <HStack>
      <Avatar name="Shane Nelson" colorPalette={pickPalette("Shane Nelson")} />
      <Avatar name="Brook Lesnar" colorPalette={pickPalette("Brook Lesnar")} />
      <Avatar name="John Lennon" colorPalette={pickPalette("John Lennon")} />
    </HStack>
  )
}
