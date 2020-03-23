import { useDisclosure } from "@chakra-ui/hooks"
import { PortalManager } from "@chakra-ui/portal"
import { chakra } from "@chakra-ui/styled"
import { Fade, SlideFade } from "@chakra-ui/transition"
import * as React from "react"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogCloseButton,
} from "./Dialog"

export default {
  title: "Dialog",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

const Button = chakra("button", { themeKey: "Button" })

export function SimpleModal() {
  const dialog = useDisclosure()
  return (
    <>
      <button onClick={dialog.onOpen}>Open</button>
      <Dialog isOpen={dialog.isOpen} onClose={dialog.onClose}>
        <DialogOverlay>
          <DialogContent>
            <DialogCloseButton />
            <DialogHeader>Welcome Home</DialogHeader>
            <DialogBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </DialogBody>
            <DialogFooter>
              <chakra.div flex="1" />
              <chakra.div>
                <Button onClick={dialog.onClose} colorScheme="gray" mr="12px">
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </chakra.div>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  )
}
export function AnimatedModal() {
  const dialog = useDisclosure()
  return (
    <>
      <button onClick={dialog.onOpen}>Open</button>
      <Fade timeout={400} in={dialog.isOpen}>
        {styles => (
          <Dialog isOpen={true} onClose={dialog.onClose}>
            <DialogOverlay style={styles}>
              <SlideFade in={dialog.isOpen} unmountOnExit={false}>
                {styles => (
                  <DialogContent padding={4} mx="auto" mt="40px" style={styles}>
                    Sit nulla est ex deserunt exercitation anim occaecat.
                    Nostrud ullamco deserunt aute id consequat veniam incididunt
                    duis in sint irure nisi. Mollit officia cillum Lorem ullamco
                    minim nostrud elit officia tempor esse quis.
                    <Button colorScheme="blue">Save</Button>
                  </DialogContent>
                )}
              </SlideFade>
            </DialogOverlay>
          </Dialog>
        )}
      </Fade>
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
        <DialogOverlay>
          <DialogContent>
            <DialogHeader>Modal Title</DialogHeader>
            <DialogBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </DialogBody>
            <DialogFooter>
              <chakra.div flex="1" />
              <Button colorScheme="gray">Button 2</Button>
              <Button colorScheme="pink" onClick={second.onOpen}>
                Open Nested
              </Button>
            </DialogFooter>
            <Dialog isOpen={second.isOpen} onClose={second.onClose}>
              <DialogOverlay>
                <DialogContent>
                  <DialogHeader>Modal 2 Title</DialogHeader>
                  <DialogFooter>
                    <chakra.div flex="1" />
                    <Button colorScheme="blue" onClick={third.onOpen}>
                      Open Nested 2
                    </Button>
                  </DialogFooter>
                  <Dialog isOpen={third.isOpen} onClose={third.onClose}>
                    <DialogOverlay>
                      <DialogContent>
                        <DialogHeader tabIndex={0}>Modal 3 Title</DialogHeader>
                      </DialogContent>
                    </DialogOverlay>
                  </Dialog>
                </DialogContent>
              </DialogOverlay>
            </Dialog>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  )
}
