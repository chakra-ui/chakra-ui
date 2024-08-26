import type { MenuRootProps } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

export interface AvatarMenuItem {
  name: string
  src: string
}

interface AvatarOverflowMenuProps extends MenuRootProps {
  items: AvatarMenuItem[]
}

export const AvatarOverflowMenu = (props: AvatarOverflowMenuProps) => {
  const { items, ...rest } = props
  return (
    <MenuRoot {...rest} positioning={{ placement: "bottom" }}>
      <MenuTrigger rounded="full" focusRing="outside">
        <Avatar variant="outline" fallback={`+${items.length}`} />
      </MenuTrigger>
      <MenuContent>
        {items.map((item) => (
          <MenuItem value={item.name}>
            <Avatar name={item.name} src={item.src} />
            {item.name}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
