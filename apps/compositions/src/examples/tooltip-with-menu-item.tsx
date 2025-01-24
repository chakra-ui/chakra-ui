import type { MenuItemProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipWithMenuItem = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </MenuTrigger>
      <MenuContent>
        <TooltipMenuItem value="new-txt" tooltip="This is the tooltip content">
          Open tooltip
        </TooltipMenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}

const TooltipMenuItem = (props: MenuItemProps & { tooltip: string }) => {
  const { value, tooltip, ...rest } = props
  return (
    <Tooltip
      ids={{ trigger: value }}
      openDelay={200}
      closeDelay={0}
      positioning={{ placement: "right" }}
      content={tooltip}
    >
      <MenuItem value={value} {...rest} />
    </Tooltip>
  )
}
