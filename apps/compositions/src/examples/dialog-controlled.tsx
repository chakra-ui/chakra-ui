"use client"

import { Button } from "compositions/ui/button"
import {
  DialogAction,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useState } from "react"
import Lorem from "react-lorem-ipsum"

export const DialogControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Lorem p={2} />
        </DialogBody>
        <DialogFooter>
          <DialogAction asChild>
            <Button variant="outline">Cancel</Button>
          </DialogAction>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
