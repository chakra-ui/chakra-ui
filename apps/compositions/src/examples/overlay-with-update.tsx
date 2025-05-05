"use client"

import { Box, Button, Dialog, Portal } from "@chakra-ui/react"
import { createOverlay } from "@chakra-ui/react"

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

export const OverlayWithUpdate = () => {
  return (
    <>
      <Button
        onClick={async () => {
          dialog.open("a", {
            title: "Initial Modal Title",
            content: (
              <Box textStyle="sm">This text will update in 2 seconds.</Box>
            ),
          })

          setTimeout(() => {
            dialog.update("a", {
              title: "Updated Modal Title",
              content: (
                <Box textStyle="sm" color="fg.muted">
                  This is the updated content of the modal.
                </Box>
              ),
            })
          }, 2000)
        }}
      >
        Open Modal
      </Button>
      <dialog.Viewport />
    </>
  )
}
