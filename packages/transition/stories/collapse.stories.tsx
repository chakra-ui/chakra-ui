import * as React from "react"
import { useBoolean } from "@chakra-ui/hooks"
import { Collapse } from "../src/collapse"

export default {
  title: "Transition / Collapse",
}

export const Basic = () => {
  const [open, { toggle }] = useBoolean()
  return (
    <>
      <button onClick={toggle}>Toggle Accordion</button>
      <Collapse isOpen={open}>
        <div
          style={{
            background: "red",
            padding: 30,
            marginTop: 8,
          }}
        >
          Accordion Content
        </div>
      </Collapse>
    </>
  )
}

export const WithStartingHeight = () => {
  const [open, { toggle }] = useBoolean()
  return (
    <>
      <button onClick={toggle}>Toggle Accordion</button>
      <Collapse startingHeight={40} isOpen={open}>
        <div
          style={{
            background: "red",
            padding: 30,
            marginTop: 8,
          }}
        >
          Accordion Content
        </div>
      </Collapse>
    </>
  )
}

export const WithUnmount = () => {
  const [open, { toggle }] = useBoolean()

  return (
    <>
      <button onClick={toggle}>Toggle Accordion</button>
      <Collapse unmountOnExit startingHeight={40} isOpen={open}>
        <div
          style={{
            background: "red",
            padding: 30,
            marginTop: 8,
          }}
        >
          Accordion Content
        </div>
      </Collapse>
    </>
  )
}
