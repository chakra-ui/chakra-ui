import { useState } from "react"
import { ActionBar, Box, Button, Kbd } from "../src"

export default {
  title: "Components / Action Bar",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="sm" onClick={() => setOpen((o) => !o)}>
        Show Action bar
      </Button>
      <ActionBar.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        closeOnInteractOutside={false}
      >
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>2 selected</ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Button variant="outline" size="sm">
              Delete <Kbd>⌫</Kbd>
            </Button>
            <Button variant="outline" size="sm">
              Share <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>S</Kbd>
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Root>
    </>
  )
}
