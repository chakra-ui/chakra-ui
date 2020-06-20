import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { usePopper } from "../src"

export default {
  title: "Popper",
}

export const Basic = () => {
  const disclosure = useDisclosure({ defaultIsOpen: true })

  const { popper, reference, arrow } = usePopper({
    placement: "left",
    forceUpdate: disclosure.isOpen,
  })

  return (
    <>
      <button
        onClick={disclosure.onToggle}
        style={{ float: "right" }}
        {...reference}
      >
        Reference
      </button>
      <div
        hidden={!disclosure.isOpen}
        {...popper}
        style={{ ...popper.style, background: "red", padding: 15 }}
      >
        <div {...arrow} style={{ ...arrow.style, background: "inherit" }} />
        Popper
      </div>
    </>
  )
}

export const Conditional = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { popper, reference, arrow } = usePopper({
    placement: "bottom-start",
    forceUpdate: isOpen,
  })

  return (
    <>
      <button
        onMouseOver={onOpen}
        onMouseLeave={onClose}
        style={{ margin: 40 }}
        {...reference}
      >
        Reference
      </button>
      {isOpen && (
        <div
          {...popper}
          style={{
            ...popper.style,
            background: "red",
            padding: 15,
            minWidth: 200,
          }}
        >
          <div {...arrow} style={{ ...arrow.style, background: "inherit" }} />
          Popper
        </div>
      )}
    </>
  )
}
