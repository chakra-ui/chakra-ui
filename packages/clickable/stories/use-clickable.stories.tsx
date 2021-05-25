import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { Merge } from "@chakra-ui/utils"
import * as React from "react"
import { useClickable, UseClickableProps } from "../src"

export type ClickableProps = Merge<UseClickableProps, HTMLChakraProps<"button">>

const Clickable: React.FC<ClickableProps> = forwardRef((props, ref) => {
  const clickable = useClickable({ ...props, ref } as any) as HTMLChakraProps<
    "button"
  >
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
