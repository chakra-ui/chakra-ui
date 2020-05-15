import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { useDescendant, useDescendants } from "."
import { createContext } from "@chakra-ui/utils"
import { DescendantContext } from "./Descendant"

export default {
  title: "Descendants",
}

type Context = DescendantContext<HTMLDivElement, { value?: string }>

const [Provider, useDescendantCtx] = createContext<Context>({
  name: "DescendantContext",
})

function Option({
  value,
  disabled,
  focusable,
}: {
  value?: string
  disabled?: boolean
  focusable?: boolean
}) {
  const context = useDescendantCtx()

  const ref = React.useRef<HTMLDivElement>(null)

  const index = useDescendant({
    element: ref.current,
    value,
    disabled,
    focusable,
    context,
  })

  return (
    <chakra.div ref={ref} tabIndex={0} data-value={value}>
      Option {index + 1}
    </chakra.div>
  )
}

function Select({ children }: { children?: React.ReactNode }) {
  const context = useDescendants<HTMLDivElement, { value?: string }>()
  return <Provider value={context}>{children}</Provider>
}

export const Default = () => (
  <Select>
    <Option value="option 1" />
    <div>
      <div>
        <Option value="option 2" />
      </div>
      <Option value="option 3" />
    </div>
  </Select>
)
