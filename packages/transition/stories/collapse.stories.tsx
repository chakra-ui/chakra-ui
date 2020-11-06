import * as React from "react"
import { useBoolean, useDisclosure } from "@chakra-ui/hooks"
import { Collapse, CollapseOptions } from "../src/collapse"

export default {
  title: "Transition / Collapse",
}

export const NestedCollapseBug = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isOpen2, onToggle: onToggle2 } = useDisclosure()

  return (
    <>
      <button onClick={onToggle}>Open 1</button>
      <button onClick={onToggle2}>Open 2</button>
      <Collapse in={isOpen}>
        Collapse 1: isOpen={String(isOpen)}
        <Collapse in={isOpen2}>Collapse 2: isOpen2={String(isOpen2)}</Collapse>
      </Collapse>
    </>
  )
}

const CollapseExample = (props: CollapseOptions) => {
  const [open, { toggle }] = useBoolean()
  return (
    <>
      <button onClick={toggle}>Toggle Accordion</button>
      <Collapse in={open} {...props}>
        <div
          style={{
            background: "red",
            padding: 30,
            marginTop: 8,
          }}
        >
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

export const Basic = () => <CollapseExample />

export const WithStartingHeight = () => <CollapseExample startingHeight={40} />

export const WithUnmount = () => <CollapseExample unmountOnExit />

export const WithoutOpacityTransition = () => (
  <CollapseExample animateOpacity={false} />
)
