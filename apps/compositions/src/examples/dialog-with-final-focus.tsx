"use client"

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Stack,
} from "@chakra-ui/react"
import { useRef } from "react"
import Lorem from "react-lorem-ipsum"

export const DialogWithFinalFocus = () => {
  const finalRef = useRef<HTMLDivElement>(null)
  return (
    <Stack align="start">
      <Dialog.Root finalFocusEl={() => finalRef.current}>
        <Dialog.Trigger asChild>
          <Button variant="outline">Open</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
              <Dialog.Body>
                <Lorem p={1} />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Box
        padding="4"
        borderWidth="2px"
        borderStyle="dashed"
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
        _focus={{ outline: "2px solid red" }}
      >
        Some other content that will receive focus on close.
      </Box>
    </Stack>
  )
}
