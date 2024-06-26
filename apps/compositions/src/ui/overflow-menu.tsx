import type { MenuRootProps } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import {
  HiMiniEllipsisHorizontal,
  HiMiniEllipsisVertical,
} from "react-icons/hi2"

export interface OverflowMenuProps extends MenuRootProps {
  vertical?: boolean
}

export const OverflowMenu = (props: OverflowMenuProps) => {
  const { children, vertical, ...rest } = props
  return (
    <MenuRoot
      {...rest}
      positioning={{ placement: "bottom-end", ...rest.positioning }}
    >
      <MenuTrigger>
        <IconButton variant="plain" size="sm" fontSize="1.2em">
          {vertical ? <HiMiniEllipsisVertical /> : <HiMiniEllipsisHorizontal />}
        </IconButton>
      </MenuTrigger>
      <MenuContent>{children}</MenuContent>
    </MenuRoot>
  )
}

export const OverflowMenuItem = MenuItem
