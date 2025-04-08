import { Button, Menu, Portal, Show } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipWithMenuItem = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <MenuItem value="new-txt" title="This is the tooltip content">
              Open tooltip
            </MenuItem>
            <MenuItem value="new-file">New File...</MenuItem>
            <MenuItem value="new-win">New Window</MenuItem>
            <MenuItem value="export">Export</MenuItem>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const MenuItem = (props: Menu.ItemProps) => {
  const { value, title, ...rest } = props
  return (
    <Show when={title} fallback={<Menu.Item value={value} {...rest} />}>
      <Tooltip
        ids={{ trigger: value }}
        openDelay={200}
        closeDelay={0}
        positioning={{ placement: "right" }}
        content={title}
      >
        <Menu.Item value={value} {...rest} />
      </Tooltip>
    </Show>
  )
}
