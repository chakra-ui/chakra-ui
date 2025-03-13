import { Button, Menu, Portal } from "@chakra-ui/react"

export const MenuWithLinks = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" variant="outline">
          Select Anime
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {links.map((link) => (
              <Menu.Item key={link.href} asChild value={link.title}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.title}
                </a>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const links = [
  {
    title: "Naruto",
    href: "https://www.crunchyroll.com/naruto",
  },
  {
    title: "One Piece",
    href: "https://www.crunchyroll.com/one-piece",
  },
  {
    title: "Attack on Titan",
    href: "https://www.crunchyroll.com/attack-on-titan",
  },
]
