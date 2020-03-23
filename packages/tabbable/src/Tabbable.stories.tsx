import { chakra, PropsOf } from "@chakra-ui/styled"
import { SafeMerge } from "@chakra-ui/utils"
import * as React from "react"
import { TabbableHookProps, useTabbable } from "./Tabbable.hook"

export default {
  title: "Tabbable",
}

const BaseButton = React.forwardRef(
  (
    props: SafeMerge<TabbableHookProps, PropsOf<"button">>,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const tabbableProps = useTabbable({ ...props, ref })
    return <button {...tabbableProps} />
  },
)

const Button = chakra(BaseButton)

export const Button_ = () => (
  <>
    <Button
      isDisabled
      isFocusable
      onClick={event => {
        alert("clicked")
      }}
      onMouseOver={event => {
        console.log(event)
        console.log("over")
      }}
      onMouseEnter={() => {
        console.log("enter")
      }}
      display="inline-flex"
      _active={{ bg: "blue", color: "white" }}
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Div Button
    </Button>

    <button
      onClick={event => {
        alert("clicked")
      }}
    >
      Native Button
    </button>
  </>
)
