"use client"

import { Button, Drawer, Portal, createOverlay } from "@chakra-ui/react"

interface DialogProps {
  title: string
  description?: string
  content?: React.ReactNode
  placement?: Drawer.RootProps["placement"]
}

const drawer = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Drawer.Root {...rest}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body spaceY="4">
              {description && (
                <Drawer.Description>{description}</Drawer.Description>
              )}
              {content}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
})

export const OverlayWithDrawer = () => {
  return (
    <>
      <Button
        onClick={() => {
          drawer.open("a", {
            title: "Drawer Title",
            description: "Drawer Description",
            placement: "end",
          })
        }}
      >
        Open Drawer
      </Button>
      <drawer.Viewport />
    </>
  )
}
