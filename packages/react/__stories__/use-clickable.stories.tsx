import * as React from "react"
import { useClickable } from "../src/components/clickable"
import { chakra, forwardRef } from "../src/styled-system"

const Clickable: React.FC<any> = forwardRef((props, ref) => {
  const clickable = useClickable({ ...props, ref })
  return <chakra.button display="inline-flex" {...clickable} />
})

export default {
  title: "System / Clickable",
}

export const button = () => (
  <>
    <Clickable
      as="div"
      onClick={() => {
        alert("clicked")
      }}
      style={{
        userSelect: "none",
      }}
      _active={{ bg: "blue.500", color: "white" }}
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Clickable
    </Clickable>

    <Clickable
      isDisabled
      isFocusable
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Clickable
    </Clickable>

    <button
      onClick={() => {
        alert("clicked")
      }}
    >
      Native Button
    </button>
  </>
)
