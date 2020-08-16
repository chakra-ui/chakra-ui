import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import { SafeMerge } from "@chakra-ui/utils"
import * as React from "react"
import { UseClickableProps, useClickable } from "../src"

export type ClickableProps = SafeMerge<
  UseClickableProps,
  PropsOf<typeof chakra.button>
>

const Clickable: React.FC<ClickableProps> = forwardRef((props, ref) => {
  const clickable = useClickable({ ...props, ref })
  return <chakra.button display="inline-flex" {...clickable} />
})

export default {
  title: "Clickable",
}

export const button = () => (
  <>
    <Clickable
      as="div"
      onClick={() => {
        alert("clicked")
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
      onClick={(event) => {
        alert("clicked")
      }}
    >
      Native Button
    </button>
  </>
)
