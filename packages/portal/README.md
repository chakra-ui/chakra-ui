# @chakra-ui/portal

A wrapper for rendering components in React Portals, with support for nested
portals and stacking.

## Installation

```sh
yarn add @chakra-ui/portal

# or

npm i @chakra-ui/portal
```

## Import components

```jsx
import { Portal, PortalManager } from "@chakra-ui/portal"
```

Render the `PortalManager` once at the root of your application

```jsx
function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <PortalManager>{/* Your app goes here  */}</PortalManager>
    </ThemeProvider>
  )
}
```

### Basic usage

Portals are render into the portal manager's node by default not
`document.body`.

```jsx
<div>
  <p>Welcome</p>
  <Portal>This text has been portaled</Portal>
</div>
```

### Nested portals

Nesting portal can be very useful to build complex widgets like nested menu,
popovers, modal, etc.

```jsx
<Portal>
  This is a portal.
  <Portal>This is a nested portal</Portal>
</Portal>
```

### Custom container

You can also portal elements into a custom containers. Simply pass a
`containerRef` prop that points to the `node` of that element.

```jsx
<>
  <div ref={ref} />
  <Portal containerRef={ref}>
    <h1>Hello world</h1>
  </Portal>
</>
```
