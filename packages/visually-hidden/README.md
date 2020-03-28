# @chakra-ui/visually-hidden

A React component that visually hides it's content but exposes it to
screen-readers.

## Installation

```sh
yarn add @chakra-ui/visually-hidden

# or

npm i @chakra-ui/visually-hidden
```

## Import component

```jsx
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
```

## Basic usage

```jsx
// it renders a `span` by default
<VisuallyHidden>This content will be hidden on screen</VisuallyHidden>

// for visually hidden input fields
<VisuallyHiddenInput type="checkbox" defaultChecked/>
```
