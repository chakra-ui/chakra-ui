import { Group } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

const names = [
  "Naruto Uzumaki",
  "Sakura Haruno",
  "Kakashi Hatake",
  "Hinata Hyuga",
  "Shikamaru Nara",
  "Ino Yamanaka",
  "Rock Lee",
  "Neji Hyuga",
  "Gaara",
  "Temari",
  "Kankuro",
]

const maxAvatars = 5

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const partition = (arr: string[], max: number) => {
  const items = []
  const overflow = []
  for (const item of arr) {
    if (items.length < max) items.push(item)
    else overflow.push(item)
  }
  return { items, overflow }
}

export const AvatarWithPopover = () => {
  const { items, overflow } = partition(names, maxAvatars)
  return (
    <Group gap="0" spaceX="2">
      {items.map((item) => (
        <Avatar key={item} name={item} colorPalette={pickPalette(item)} />
      ))}
      {overflow.length > 0 && (
        <MenuRoot positioning={{ placement: "bottom" }}>
          <MenuTrigger rounded="full" focusRing="outside">
            <Avatar variant="outline" fallback="+3" />
          </MenuTrigger>
          <MenuContent>
            {overflow.map((item) => (
              <MenuItem value={item} key={item}>
                <Avatar
                  size="sm"
                  name={item}
                  colorPalette={pickPalette(item)}
                />
                {item}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      )}
    </Group>
  )
}
