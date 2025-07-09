import {
  Button,
  CloseButton,
  Drawer,
  Kbd,
  Portal,
  Text,
} from "@chakra-ui/react"

export const DrawerWithConditionalVariants = () => {
  return (
    <>
      <Text mb="4">Open drawer and resize screen to mobile size</Text>
      <Drawer.Root placement={{ mdDown: "bottom", md: "end" }}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Drawer
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
    </>
  )
}
