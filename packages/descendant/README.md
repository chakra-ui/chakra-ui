# Descendant

Keep track of descendant components and their relative indices.

A descendant index solution for better accessibility support in compound
components.

> **Note 🚨:** This package is primarily intended for internal use by the Chakra
> UI library. You should not use it directly in your production projects.

## Installation

```sh
yarn add @chakra-ui/descendant

# or

npm i @chakra-ui/descendant
```

## Motivation

Descendants observer is a utility hook for keeping track of descendant elements
and their relative indices.

In short, this package allows each item in a list to know its relative index and
the parent of the list can keep track of each child, without needing to render
in a loop and pass each component an index.

This enables component composition:

```jsx
<List>
  <Item /> // I'm index 0
  <Item /> // I'm index 1<div>
    <div>
      <Item /> // I'm arbitrarily nested, but still know that I'm index 2
    </div>
  </div>
</List>
```

### Usage

```jsx
import { createDescendantContext } from "@chakra-ui/descendant"
import * as React from "react"

const [
  DescendantsProvider,
  useDescendantsContext,
  useDescendants,
  useDescendant,
] = createDescendantContext()

const MenuContext = React.createContext({})

function Menu({ children }) {
  // 1. Call the `useDescendants` hook
  const descendants = useDescendants()

  const [selected, setSelected] = React.useState(1)
  const context = React.useMemo(() => ({ selected, setSelected }), [selected])

  return (
    // 2. Add the descendants context
    <DescendantsProvider value={descendants}>
      <MenuContext.Provider value={context}>
        <div role="menu" style={{ maxWidth: 320 }}>
          <button
            onClick={() => {
              const prev = descendants.prev(selected)
              prev.node.focus()
              setSelected(prev.index)
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              const next = descendants.next(selected)
              next.node.focus()
              setSelected(next.index)
            }}
          >
            Next
          </button>
          {children}
        </div>
      </MenuContext.Provider>
    </DescendantsProvider>
  )
}

const MenuItem = ({ children }) => {
  const { selected, setSelected } = React.useContext(MenuContext)

  // 3. Read from descendant context
  const { index, register } = useDescendant()

  const isSelected = index === selected

  return (
    <div
      role="menuitem"
      ref={register}
      aria-selected={isSelected}
      onMouseMove={() => setSelected(index)}
      style={{ color: isSelected ? "red" : "black" }}
    >
      {children} - {index}
    </div>
  )
}

const Example = () => {
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)

  const toggle = () => {
    setShow(!show)
    if (!show === true) {
      setTimeout(() => {
        setShow2(true)
      }, 1000)
    }
  }

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Menu>
        <MenuItem>One</MenuItem>
        {show && <MenuItem>Two</MenuItem>}
        <MenuItem>Three</MenuItem>
        <MenuItem>Four</MenuItem>
        <div>
          {show2 && <MenuItem>Testing 🌟</MenuItem>}
          <MenuItem>Five</MenuItem>
        </div>
      </Menu>
    </div>
  )
}
```
