import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Tag } from "compositions/ui/tag"

export const TagWithAvatar = () => {
  return (
    <HStack>
      <Tag
        rounded="full"
        startElement={
          <Avatar
            size="sm"
            src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
            name="Sasuke"
          />
        }
      >
        Uchiha Sasuke
      </Tag>
      <Tag
        rounded="full"
        startElement={
          <Avatar
            size="sm"
            src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c"
            name="Kakashi"
          />
        }
      >
        Kakashi Hatake
      </Tag>
    </HStack>
  )
}
