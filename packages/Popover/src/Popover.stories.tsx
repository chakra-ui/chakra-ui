import * as React from "react"
import { usePopover } from "./Popover.hook"

export default {
  title: "Popover",
}

export function PopoverExample() {
  const { trigger, popover, onClose } = usePopover()

  return (
    <>
      <button {...trigger}>Open</button>
      <div
        {...popover}
        style={{
          ...popover.style,
          background: "tomato",
          color: "white",
          padding: 30,
        }}
      >
        This is the content <br />
        <button onClick={onClose}>Close</button>
      </div>
    </>
  )
}
