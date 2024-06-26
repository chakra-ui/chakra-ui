import { IconButton, type MenuRootProps } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { LuCircleEllipsis } from "react-icons/lu"

export interface OverflowMenuProps extends MenuRootProps {}

export const OverflowMenu = (props: OverflowMenuProps) => {
  const { children, ...rest } = props
  return (
    <MenuRoot {...rest}>
      <MenuTrigger>
        <IconButton variant="plain">
          <LuCircleEllipsis />
        </IconButton>
      </MenuTrigger>
      <MenuContent>{children}</MenuContent>
    </MenuRoot>
  )
}

export const OverflowMenuItem = MenuItem
