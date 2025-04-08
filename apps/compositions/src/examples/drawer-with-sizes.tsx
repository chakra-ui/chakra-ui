import {
  Button,
  CloseButton,
  Drawer,
  For,
  HStack,
  Kbd,
  Portal,
} from "@chakra-ui/react"

export const DrawerWithSizes = () => {
  return (
    <HStack wrap="wrap">
      <For each={["xs", "sm", "md", "lg", "xl", "full"]}>
        {(size) => (
          <Drawer.Root key={size} size={size}>
            <Drawer.Trigger asChild>
              <Button variant="outline" size="sm">
                Open ({size})
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    Press the <Kbd>esc</Kbd> key to close the drawer.
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Drawer.ActionTrigger>
                    <Button>Save</Button>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        )}
      </For>
    </HStack>
  )
}
