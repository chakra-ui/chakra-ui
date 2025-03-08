"use client"

import {
  Button,
  CloseButton,
  Dialog,
  HoverCard,
  Link,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useRef } from "react"

export const HoverCardInDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Select in Dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HoverCard.Root size="sm">
                <HoverCard.Trigger asChild>
                  <Link href="#">@chakra_ui</Link>
                </HoverCard.Trigger>
                <Portal container={contentRef}>
                  <HoverCard.Positioner>
                    <HoverCard.Content>
                      <HoverCard.Arrow />
                      <Stack gap="1">
                        <Text textStyle="sm" fontWeight="semibold">
                          Chakra UI
                        </Text>
                        <Text textStyle="sm" color="fg.muted">
                          The most powerful toolkit for building modern web
                          applications.
                        </Text>
                      </Stack>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>
            </Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
