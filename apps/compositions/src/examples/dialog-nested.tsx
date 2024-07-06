"use client"

import { Button, Label, Portal, VStack } from "@chakra-ui/react"
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useState } from "react"
import Lorem from "react-lorem-component"

export const DialogNested = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <VStack alignItems="start" gap={3}>
      <Label>With Nested Dialog</Label>
      <DialogRoot lazyMount>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>Dialog Title</DialogHeader>
              <DialogBody>
                <Lorem count={2} />
              </DialogBody>
              <DialogFooter>
                <Button variant="outline">Button 2</Button>
                <Button onClick={() => setIsOpen(true)}>Open Nested</Button>
              </DialogFooter>
              <DialogRoot
                lazyMount
                open={isOpen}
                onOpenChange={(e) => setIsOpen(e.open)}
              >
                <Portal>
                  <DialogBackdrop />
                  <DialogPositioner>
                    <DialogContent>
                      <DialogHeader>Dialog. 2 Title</DialogHeader>
                      <DialogBody>
                        <Lorem count={1} />
                      </DialogBody>
                    </DialogContent>
                  </DialogPositioner>
                </Portal>
              </DialogRoot>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </DialogRoot>
    </VStack>
  )
}
