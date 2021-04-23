import { useInterval } from "@chakra-ui/hooks"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  DescendantsContextProvider,
  useDescendant,
  useDescendants,
} from "../src"

export default {
  title: "Descendants / NumberInput",
}

function NumberInput({ children }: { children?: React.ReactNode }) {
  const context = useDescendants<HTMLDivElement, { value?: string }>()
  const { descendants } = context

  React.useEffect(() => {
    descendants.first().node.focus()
  }, [])

  return (
    <DescendantsContextProvider value={context as any}>
      {children}
    </DescendantsContextProvider>
  )
}

function Input() {
  const [focused, setFocused] = React.useState(false)
  const { register, index, descendants } = useDescendant<HTMLInputElement>()

  return (
    <input
      style={{
        width: 50,
        height: 50,
        background: "gray",
        margin: 5,
        textAlign: "center",
      }}
      placeholder={focused ? "" : "-"}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      ref={register}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          descendants.next(index).node.focus()
        }
      }}
    />
  )
}

export const WithNumberInput = () => {
  return (
    <NumberInput>
      <Input />
      <Input />
      <Input />
    </NumberInput>
  )
}
