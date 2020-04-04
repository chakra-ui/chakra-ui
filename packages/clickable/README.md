# @chakra-ui/clickable

React hook that implements all the interactions of a native `button` component
with support for making it focusable even if it's disabled.

It can be used with both native button elements or other elements (like `div`).

## Installation

```jsx
import { useClickable, Clickable } from "@chakra-ui/clickable"
```

## Usage

Clickable renders a `button` by default.

```jsx
<Clickable
  as="div"
  onClick={event => {
    alert("clicked")
  }}
  _active={{ bg: "blue", color: "white" }}
  _disabled={{ opacity: 0.4, pointerEvents: "none" }}
>
  Clickable
</Clickable>
```
