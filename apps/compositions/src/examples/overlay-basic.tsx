"use client"

import { Button, Dialog, Portal, createOverlay } from "@chakra-ui/react"

interface DialogProps {
  title: string
  description?: string
  content?: React.ReactNode
}

const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, ...rest } = props
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})

export const OverlayBasic = () => {
  return (
    <>
      <Button
        onClick={() => {
          dialog.open("a", {
            title: "Dialog Title",
            description: "Dialog Description",
          })
        }}
      >
        Open Modal
      </Button>
      <dialog.Viewport />
    </>
  )
}
