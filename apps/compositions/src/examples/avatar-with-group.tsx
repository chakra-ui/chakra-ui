import { Avatar, AvatarGroup } from "@chakra-ui/react"

export const AvatarWithGroup = () => {
  return (
    <AvatarGroup gap="0" spaceX="-3" size="lg">
      <Avatar.Root>
        <Avatar.Fallback name="Uchiha Sasuke" />
        <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Fallback name="Baki Ani" />
        <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
      </Avatar.Root>

      <Avatar.Root>
        <Avatar.Fallback name="Uchiha Chan" />
        <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
      </Avatar.Root>
      <Avatar.Root variant="solid">
        <Avatar.Fallback>+3</Avatar.Fallback>
      </Avatar.Root>
    </AvatarGroup>
  )
}
