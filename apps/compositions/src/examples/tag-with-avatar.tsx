import { HStack } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import { Tag } from "compositions/ui/tag"

export const TagWithAvatar = () => {
  return (
    <HStack>
      {items.map((item) => (
        <Tag
          key={item.name}
          rounded="full"
          startElement={<Avatar size="sm" src={item.src} name={item.name} />}
          pe="2"
        >
          {item.name}
        </Tag>
      ))}
    </HStack>
  )
}

const items = [
  {
    name: "Uchiha Sasuke",
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd",
  },
  {
    name: "Hatake Kakashi",
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c",
  },
]
