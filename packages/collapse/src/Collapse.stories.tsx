import * as React from "react"
import Collapse from "./Collapse"

export default {
  title: "Collapse",
}

export function SampleSpring() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(t => !t)}>Click</button>
      <Collapse isOpen={open} animateOpacity={false}>
        <div style={{ padding: 20, background: "tomato", color: "white" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </Collapse>
    </>
  )
}
