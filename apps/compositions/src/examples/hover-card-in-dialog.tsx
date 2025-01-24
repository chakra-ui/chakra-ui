"use client"

import { Button, Link, Stack, Text } from "@chakra-ui/react"
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "compositions/ui/hover-card"
import { useRef } from "react"

export const HoverCardInDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  return (
    <DialogRoot>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent ref={contentRef}>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Select in Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HoverCardRoot size="sm">
            <HoverCardTrigger asChild>
              <Link href="#">@chakra_ui</Link>
            </HoverCardTrigger>
            <HoverCardContent>
              <HoverCardArrow />
              <Stack gap="4" direction="row">
                <Stack gap="3">
                  <Stack gap="1">
                    <Text textStyle="sm" fontWeight="semibold">
                      Chakra UI
                    </Text>
                    <Text textStyle="sm" color="fg.muted">
                      The most powerful toolkit for building modern web
                      applications.
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </HoverCardContent>
          </HoverCardRoot>
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  )
}
