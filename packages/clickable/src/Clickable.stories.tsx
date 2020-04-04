import * as React from "react"
import { mergeRefs, attr, SafeMerge } from "@chakra-ui/utils"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Clickable } from "."

export type ClickableProps = SafeMerge<
  ClickableHookProps,
  PropsOf<typeof chakra.button>
>

export const Clickable = React.forwardRef(
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
      onClick={event => {
        alert("clicked")
      }}
      _active={{ bg: "blue", color: "white" }}
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
