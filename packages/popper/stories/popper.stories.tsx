import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { usePopper } from "../src"

export default {
  title: "Popper",
}

export const Basic = () => {
  const disclosure = useDisclosure({ defaultIsOpen: true })

  const { popper, reference, arrow } = usePopper({
    placement: "right-start",
    matchWidth: true,
  })

  return (
    <>
      <button
        onClick={disclosure.onToggle}
        style={{ margin: 400 }}
        {...reference}
      >
        Reference Tooltip Trigger
      </button>

      <div
        hidden={!disclosure.isOpen}
        {...popper}
        style={{
          ...popper.style,
          width: 250,
          background: "red",
          padding: 15,
          borderRadius: 6,
        }}
      >
        Popper
        <div
          {...arrow}
          style={{
            ...arrow.style,
            color: "red",
          }}
        />
      </div>
    </>
  )
}
