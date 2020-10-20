import React from "react"
import { Drawer, DrawerContent, DrawerBody, DrawerOverlay } from "../src/drawer"

export default {
  title: "Modal / Drawer",
}

export const DrawerExample = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <div>This is the drawer content</div>
          <button>This is a button</button>
        </DrawerContent>
      </Drawer>
    </>
  )
}
