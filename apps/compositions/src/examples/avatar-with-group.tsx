import { Avatar, AvatarGroup } from "compositions/ui/avatar"

export const AvatarWithGroup = () => {
  return (
    <AvatarGroup size="lg">
      <Avatar
        src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd"
        name="Uchiha Sasuke"
      />
      <Avatar
        src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c"
        name="Baki Ani"
      />
      <Avatar
        src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863"
        name="Uchiha Chan"
      />
      <Avatar variant="solid" fallback="+3" />
    </AvatarGroup>
  )
}
