import { usePopper } from "@chakra-ui/popper"
import * as React from "react"

const Page = () => {
  const [isOpen, setIsOpen] = React.useState(true)
  const { referenceRef, getPopperProps, getArrowProps } = usePopper({
    gutter: 16,
    placement: "right-end",
    modifiers: [],
  })
  return (
    <div style={{ minHeight: "200vh", paddingTop: "100vh" }}>
      <button onClick={() => setIsOpen(!isOpen)} ref={referenceRef}>
        Testing
      </button>
      {isOpen && (
        <div
          {...getPopperProps({
            style: { padding: 20, background: "red" },
          })}
        >
          <div
            {...getArrowProps({
              style: { background: "yellow" },
              size: "10px",
            })}
          />
          Popper
        </div>
      )}
    </div>
  )
}

export default Page
