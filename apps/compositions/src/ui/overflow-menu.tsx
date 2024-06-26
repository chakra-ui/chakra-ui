import type { ButtonProps, MenuRootProps } from "@chakra-ui/react"
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

export interface OverflowMenuRootProps extends MenuRootProps {}

export const OverflowMenuRoot = (props: OverflowMenuRootProps) => {
  return (
    <MenuRoot
      {...props}
      positioning={{ placement: "bottom-end", ...props.positioning }}
    />
  )
}

export interface OverflowMenuTriggerProps extends ButtonProps {
  vertical?: boolean
}

export const OverflowMenuTrigger = (props: OverflowMenuTriggerProps) => {
  const { vertical, ...rest } = props
  return (
    <MenuTrigger>
      <IconButton variant="plain" size="sm" {...rest}>
        {vertical ? <HiMiniEllipsisVertical /> : <HiMiniEllipsisHorizontal />}
      </IconButton>
    </MenuTrigger>
  )
}

export const OverflowMenuItem = MenuItem
export const OverflowMenuContent = MenuContent
