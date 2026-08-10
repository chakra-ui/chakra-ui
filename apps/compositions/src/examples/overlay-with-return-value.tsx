"use client"

import { Button, Dialog, Portal } from "@chakra-ui/react"
import { createOverlay } from "@chakra-ui/react"

interface DialogProps {
  title: string
  description: string
  content?: React.ReactNode
}

interface DialogResult {
  message: string
}

const dialog = createOverlay<DialogProps, DialogResult>((props) => {
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

export const OverlayWithReturnValue = () => {
  return (
    <>
      <Button
        onClick={async () => {
          const returnValue = await dialog.open("a", {
            title: "Dialog Title",
            description: "Dialog Description",
            content: (
              <Button
                onClick={() => {
                  dialog.close("a", { message: "Welcome" })
                }}
              >
                Close
              </Button>
            ),
          })

          await dialog.waitForExit("a")

          if (!returnValue) return

          dialog.open("b", {
            title: returnValue.message,
            description: "Next Dialog Description",
          })
        }}
      >
        Open Modal
      </Button>
      <dialog.Viewport />
    </>
  )
}
