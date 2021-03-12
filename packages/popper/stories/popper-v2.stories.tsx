import * as React from "react"
import { usePopper } from "../src/popper"

export default {
  title: "Popper v2",
}

export const ExamplePopper = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const { referenceRef, popperRef } = usePopper({
    gutter: 16,
    placement: "top",
  })
  return (
    <div style={{ minHeight: "200vh", paddingTop: "40vh" }}>
      <button onClick={() => setIsOpen(!isOpen)} ref={referenceRef}>
        Testing
      </button>
      {isOpen && (
        <div ref={popperRef} style={{ padding: 20, background: "red" }}>
          <div
            data-popper-arrow=""
            style={{
              background: "yellow",
              "--popper-arrow-size": "10px",
            }}
          />
          Popper
        </div>
      )}
    </div>
  )
}

declare module "csstype" {
  interface Properties {
    [k: string]: any
  }
}
