"use client"

import {
  Box,
  Button,
  DialogPositioner,
  Input,
  Label,
  VStack,
} from "@chakra-ui/react"
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useRef } from "react"
import Lorem from "react-lorem-component"

export const DialogWithInitialFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <VStack alignItems="start" gap={3}>
      <Label>With Initial Focus</Label>
      <DialogRoot initialFocusEl={() => inputRef.current}>
        <DialogBackdrop />
        <DialogTrigger>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Dialog Header</DialogHeader>
          <DialogBody>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input ref={inputRef} placeholder="Focus First" />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </VStack>
  )
}

export const DialogWithFinalFocus = () => {
  const finalRef = useRef<HTMLDivElement>(null)
  return (
    <VStack alignItems="start" gap={3}>
      <Label>With Final Focus</Label>
      <VStack alignItems="start">
        <Box
          ref={finalRef}
          tabIndex={-1}
          aria-label="Focus moved to this box"
          _focus={{ outline: "2px solid red" }}
        >
          Some other content that'll receive focus on close.
        </Box>
        <DialogRoot finalFocusEl={() => finalRef.current}>
          <DialogBackdrop />
          <DialogTrigger>
            <Button variant="outline" mt={4}>
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>Dialog Header</DialogHeader>
              <DialogCloseTrigger asChild />
              <DialogBody>
                <Lorem count={1} />
              </DialogBody>
            </DialogContent>
          </DialogPositioner>
        </DialogRoot>
      </VStack>
    </VStack>
  )
}
