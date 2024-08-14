"use client"

import { Box, Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useRef } from "react"
import Lorem from "react-lorem-ipsum"

export const DialogWithFinalFocus = () => {
  const finalRef = useRef<HTMLDivElement>(null)
  return (
    <Stack align="start">
      <DialogRoot finalFocusEl={() => finalRef.current}>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Dialog Header</DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <Lorem p={1} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      <Box
        padding="4"
        borderWidth="2px"
        borderStyle="dashed"
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
        _focus={{ outline: "2px solid red" }}
      >
        Some other content that'll receive focus on close.
      </Box>
    </Stack>
  )
}
