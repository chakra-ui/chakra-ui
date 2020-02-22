import { PropsOf } from "@chakra-ui/system"
import React from "react"
import { VisuallyHidden } from "../src/VisuallyHidden"

export default {
  title: "Visually Hidden",
}

export const Basic = () => (
  <VisuallyHidden>This is visually hidden</VisuallyHidden>
)

type InputProps = PropsOf<"input">

// Even though, it's not visible, press `Tab`
// and use the spacebar to toggle the checked state
export const WithGeneric = () => (
  <VisuallyHidden<InputProps>
    as="input"
    type="checkbox"
    ref={node => {
      console.log(node)
    }}
    onChange={event => {
      console.log(event.target.checked)
    }}
  />
)
