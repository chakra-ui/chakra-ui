import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { DialogContent, DialogOverlay } from "./Dialog"
import { Dialog, BaseDialogOverlay, BaseDialogContent } from "./Dialog.base"

export default {
  title: "Dialog",
}

export function SimpleModal() {
  const dialog = useDisclosure()
  return (
    <>
      <button onClick={dialog.onOpen}>Open</button>
      <Dialog isOpen={dialog.isOpen} onClose={dialog.onClose}>
        <DialogOverlay />
        <DialogContent>Welcome Home</DialogContent>
      </Dialog>
    </>
  )
}

export function NestedModal() {
  const first = useDisclosure()
  const second = useDisclosure()
  const third = useDisclosure()
  return (
    <>
      <button onClick={first.onOpen}>Open</button>
      <Dialog isOpen={first.isOpen} onClose={first.onClose}>
        <DialogOverlay />
        <DialogContent color="black">
          Welcome Home
          <br />
          <button>Button 2</button>
          <button onClick={second.onOpen}>Open Nested</button>
          <Dialog isOpen={second.isOpen} onClose={second.onClose}>
            <DialogOverlay />
            <DialogContent>
              Welcome Home
              <button onClick={third.onOpen}>Open Nested 2</button>
              <Dialog isOpen={third.isOpen} onClose={third.onClose}>
                <DialogOverlay />
                <DialogContent>Welcome Home</DialogContent>
              </Dialog>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  )
}
