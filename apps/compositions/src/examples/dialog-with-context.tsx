"use client"

import { Button, DialogContext } from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"

export const DialogWithContext = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogContext>
          {(store) => (
            <>
              <DialogBody>
                <p>Dialog is open: {store.open ? "true" : "false"}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button onClick={() => store.setOpen(false)}>Close</button>
              </DialogBody>
            </>
          )}
        </DialogContext>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
