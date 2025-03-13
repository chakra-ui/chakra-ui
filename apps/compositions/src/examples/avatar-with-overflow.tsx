import { Avatar, Group, Menu, Portal } from "@chakra-ui/react"

const names = [
  "Naruto Uzumaki",
  "Sakura Haruno",
  "Kakashi Hatake",
  "Hinata Hyuga",
  "Shikamaru Nara",
]
const maxAvatars = 3

export const AvatarWithOverflow = () => {
  const { items, overflow } = partition(names, maxAvatars)
  return (
    <Group gap="0" spaceX="2">
      {items.map((item) => (
        <Avatar.Root key={item} colorPalette={pickPalette(item)}>
          <Avatar.Fallback name={item} />
        </Avatar.Root>
      ))}
      {overflow.length > 0 && (
        <Menu.Root positioning={{ placement: "bottom" }}>
          <Menu.Trigger rounded="full" focusRing="outside">
            <Avatar.Root variant="outline">
              <Avatar.Fallback>+{overflow.length}</Avatar.Fallback>
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {overflow.map((item) => (
                  <Menu.Item value={item} key={item}>
                    <Avatar.Root size="xs" colorPalette={pickPalette(item)}>
                      <Avatar.Fallback name={item} />
                    </Avatar.Root>
                    {item}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </Group>
  )
}

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
