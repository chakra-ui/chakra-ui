import { chakra, PropsOf } from "@chakra-ui/system"
import { SafeMerge } from "@chakra-ui/utils"
import * as React from "react"
import { UseClickableProps, useClickable } from "."

export type ClickableProps = SafeMerge<
  UseClickableProps,
  PropsOf<typeof chakra.button>
>

const Clickable = React.forwardRef(
  (props: ClickableProps, ref: React.Ref<any>) => {
    const clickable = useClickable({ ...props, ref })
    return <chakra.button display="inline-flex" {...clickable} />
  },
)

export default {
  title: "Tabbable",
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
      onClick={event => {
        alert("clicked")
      }}
    >
      Native Button
    </button>
  </>
)
