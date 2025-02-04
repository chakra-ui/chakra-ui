import { Avatar, AvatarGroup, Stack } from "@chakra-ui/react"

export const AvatarGroupWithStacking = () => {
  return (
    <Stack>
      <AvatarGroup size="lg" stacking="last-on-top">
        {items.map((item) => (
          <Avatar.Root key={item.name}>
            <Avatar.Fallback name={item.name} />
            <Avatar.Image src={item.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root>
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </AvatarGroup>

      <AvatarGroup size="lg" stacking="first-on-top">
        {items.map((item) => (
          <Avatar.Root key={item.name}>
            <Avatar.Fallback name={item.name} />
            <Avatar.Image src={item.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root>
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </AvatarGroup>

      <AvatarGroup size="lg" spaceX="1" borderless>
        {items.map((item) => (
          <Avatar.Root key={item.name}>
            <Avatar.Fallback name={item.name} />
            <Avatar.Image src={item.src} />
          </Avatar.Root>
        ))}
        <Avatar.Root>
          <Avatar.Fallback>+3</Avatar.Fallback>
        </Avatar.Root>
      </AvatarGroup>
    </Stack>
  )
}

const items = [
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd",
    name: "Uchiha Sasuke",
  },
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c",
    name: "Baki Ani",
  },
  {
    src: "https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863",
    name: "Uchiha Chan",
  },
]
