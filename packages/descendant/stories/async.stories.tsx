/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInterval } from "@chakra-ui/hooks"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import createDescendantContext from "../src"

export default {
  title: "Descendants / Async",
}

const [
  DescendantsProvider,
  useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext<HTMLDivElement, { value?: string }>()

function Select({ children }: { children?: React.ReactNode }) {
  const descendants = useDescendants()
  const count = descendants.count()

  React.useEffect(() => {
    descendants.last()?.node.focus()
  }, [descendants, count])

  return (
    <DescendantsProvider value={descendants}>{children}</DescendantsProvider>
  )
}

function Option({ value, disabled }: { value?: string; disabled?: boolean }) {
  const { register, index, descendants } = useDescendant({
    disabled,
  })

  return (
    <chakra.div
      ref={register}
      role="button"
      tabIndex={0}
      data-value={value}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          descendants.next(index)?.node.focus()
        }
      }}
    >
      Option {index + 1}
    </chakra.div>
  )
}

export const DescendantsWithInterval = () => {
  const [done, setDone] = React.useState(false)

  useInterval(() => {
    setDone(!done)
  }, 3000)

  return (
    <Select>
      <Option value="option 1" />
      <div>
        <div>
          <Option value="option 2" />
          {done && (
            <div>
              <Option value="option 3" />
              <Option value="option 4" />
            </div>
          )}
        </div>
        <Option value="option 5" />
      </div>
      {done && (
        <div>
          <Option value="option 6" />
          <Option value="option 7" />
        </div>
      )}
    </Select>
  )
}
