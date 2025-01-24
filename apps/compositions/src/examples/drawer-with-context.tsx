"use client"

import { Button, DrawerContext } from "@chakra-ui/react"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "compositions/ui/drawer"

export const DrawerWithContext = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerContext>
          {(store) => (
            <DrawerBody>
              <p>Drawer is open: {store.open ? "true" : "false"}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button onClick={() => store.setOpen(false)}>Close</button>
            </DrawerBody>
          )}
        </DrawerContext>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}
