import { Avatar, HStack } from "@chakra-ui/react"

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

export const AvatarWithRandomColor = () => {
  return (
    <HStack>
      <Avatar.Root colorPalette={pickPalette("Shane Nelson")}>
        <Avatar.Fallback name="Shane Nelson" />
      </Avatar.Root>
      <Avatar.Root colorPalette={pickPalette("Brook Lesnar")}>
        <Avatar.Fallback name="Brook Lesnar" />
      </Avatar.Root>
      <Avatar.Root colorPalette={pickPalette("John Lennon")}>
        <Avatar.Fallback name="John Lennon" />
      </Avatar.Root>
    </HStack>
  )
}
