"use client"

import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useState } from "react"
import Lorem from "react-lorem-ipsum"

export const DialogControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>
          <Lorem p={2} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
