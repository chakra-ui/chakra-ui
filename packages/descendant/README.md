# Descendant

Keep track of descendant components and their relative indices.

A descendant index solution for better accessibility support in compound
components.

> **Note 🚨:** This package is primarily intended for internal use by the Chakra
> UI library. You should not use it directly in your production projects.

## Installation

```sh
yarn add @chakra-ui/descendants

# or

npm i @chakra-ui/descendants
```

## Motivation

Descendants observer is an utility hook for keeping track of descendant elements
and their relative indices.

In short, this package allows each item in a list to know it's relative index
and the parent of the list can keep track of each child, without needing to
render in a loop and pass each component an index.

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
import {
  DescendantsContext,
  useDescendant,
  useDescendants,
  useDescendantsContext,
} from "@descendants/react"
import * as React from "react"

const MenuContext = React.createContext({})

function Menu({ children }) {
  // 1. Call the `useDescendants` hook
  const descendants = useDescendants()

  // 2. Grab the `observer` in the bag
  const { observer } = descendants

  const [selected, setSelected] = React.useState(1)
  const context = React.useMemo(() => ({ selected, setSelected }), [selected])

  return (
    // 3. Add the descendants context
    <DescendantsContext.Provider value={descendants}>
      <MenuContext.Provider value={context}>
        <div role="menu" style={{ maxWidth: 320 }}>
          <button
            onClick={() => {
              const prev = observer.prev(selected, true)
              prev.node.focus()
              setSelected(prev.index)
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              const next = observer.next(selected, true)
              next.node.focus()
              setSelected(next.index)
            }}
          >
            Next
          </button>
          {children}
        </div>
      </MenuContext.Provider>
    </DescendantsContext.Provider>
  )
}

const MenuItem = ({ children }) => {
  const { selected, setSelected } = React.useContext(MenuContext)

  // 4. Read from descendant context
  const { index, ref } = useDescendant()

  const isSelected = index === selected

  return (
    <div
      role="menuitem"
      ref={ref}
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
