"use client"

import { Input, Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import { Field } from "compositions/ui/field"
import { useRef } from "react"

export const DialogWithInitialFocus = () => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Header</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="First Name">
              <Input placeholder="First Name" />
            </Field>
            <Field label="Last Name">
              <Input ref={ref} placeholder="Focus First" />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
