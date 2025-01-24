import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

export const MenuWithLinks = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button size="sm" variant="outline">
          Select Anime
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value="naruto">
          <a
            href="https://www.crunchyroll.com/naruto"
            target="_blank"
            rel="noreferrer"
          >
            Naruto
          </a>
        </MenuItem>
        <MenuItem asChild value="one-piece">
          <a
            href="https://www.crunchyroll.com/one-piece"
            target="_blank"
            rel="noreferrer"
          >
            One Piece
          </a>
        </MenuItem>
        <MenuItem asChild value="attack-on-titan">
          <a
            href="https://www.crunchyroll.com/attack-on-titan"
            target="_blank"
            rel="noreferrer"
          >
            Attack on Titan
          </a>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
