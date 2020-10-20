import * as React from "react"

/**
 * const returnType = {
  stackIndex: 0,
  elements: {
    menu: [],
    popover: [],
    modal: [],
    tooltip: [],
  },
  addElement() {},
  removeElement() {},
  count: 9,
};
 */

interface StackContextProviderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

interface OverlayStackContext {
  parent: OverlayStackContext | null
  count: number
  addElement: () => void
  removeElement: () => void
}

const Context = React.createContext<OverlayStackContext | null>(null)

export function StackContextProvider(props: StackContextProviderProps) {
  const { children } = props

  const parent = React.useContext(Context)
  const [count, setCount] = React.useState(0)

  const context = React.useMemo(
    () => ({
      parent,
      count,
      addElement() {
        setCount((count) => count + 1)
        parent?.addElement()
      },
      removeElement() {
        setCount((count) => count - 1)
        parent?.removeElement()
      },
    }),
    [parent, count],
  )

  return <Context.Provider value={context}>{children}</Context.Provider>
}
