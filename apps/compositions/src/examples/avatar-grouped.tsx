"use client"

import { Avatar, For, Group, Stack, useSlotRecipe } from "@chakra-ui/react"

export const AvatarGrouped = () => {
  const recipe = useSlotRecipe("avatar")
  return (
    <Stack gap="24px">
      <For each={recipe.variantMap.size}>
        {(size) => (
          <Group gap="0" spaceX="var(--avatar-margin)" key={size}>
            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
              <Avatar.Fallback>US</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
              <Avatar.Fallback>BA</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size}>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
              <Avatar.Fallback>UC</Avatar.Fallback>
            </Avatar.Root>

            <Avatar.Root size={size} variant="solid">
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
          </Group>
        )}
      </For>
    </Stack>
  )
}
