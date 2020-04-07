import { useDisclosure } from "@chakra-ui/hooks"
import React from "react"
import { usePopper } from "."

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
