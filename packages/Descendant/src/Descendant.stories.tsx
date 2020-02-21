import { chakra } from "@chakra-ui/system"
import React from "react"
import { useDescendant, useDescendants } from "./"
import { createDescendantsContext } from "./Descendant"

export default {
  title: "Descendants",
}

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

  const ref = React.useRef<HTMLDivElement>()

  const { index } = useDescendant({
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

const [DescendantsProvider, useDescendantCtx] = createDescendantsContext<
  HTMLDivElement,
  { value?: string }
>()

function Select({ children }: { children?: React.ReactNode }) {
  const context = useDescendants<HTMLDivElement, { value?: string }>()
  return <DescendantsProvider value={context}>{children}</DescendantsProvider>
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
