"use client"

import { Input } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useRef } from "react"

export const DialogWithInitialFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => inputRef.current}>
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
  )
}
