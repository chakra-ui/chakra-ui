"use client"

import {
  Button,
  DialogBody,
  DialogCloseTrigger,
  IconButton,
  Label,
  VStack,
} from "@chakra-ui/react"
import {
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { HiX } from "react-icons/hi"
import Lorem from "react-lorem-component"

export const DialogWithInsideScroll = () => {
  return (
    <VStack alignItems="start" gap={3}>
      <Label>With Inside Scroll</Label>
      <DialogRoot scrollBehavior="inside" size="sm">
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>With Inside Scroll</DialogHeader>
            <DialogCloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </DialogCloseTrigger>
            <DialogBody>
              <Lorem count={8} />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </VStack>
  )
}

export const DialogWithOutsideScroll = () => {
  return (
    <VStack alignItems="start" gap={3}>
      <Label>With Outside Scroll</Label>
      <DialogRoot size="sm">
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>With Outside Scroll</DialogHeader>
            <DialogCloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </DialogCloseTrigger>
            <DialogBody>
              <Lorem count={8} />
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </VStack>
  )
}
