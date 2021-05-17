# @chakra-ui/popover

Popover is a non-modal dialog that floats around a trigger. It is used to
display contextual information to the user, and should be paired with a
clickable trigger element.

## Installation

```sh
yarn add @chakra-ui/popover

# or

npm i @chakra-ui/popover
```

## Import components

```jsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
```

## Basic Usage

When using this component, ensure the children passed to `PopoverTrigger` is
focusable, user can tab to it using their keyboard, and it can take a `ref`. It
is critical for accessiblity.

> **A11y:** When the Popover opens, focus is sent to the `PopoverContent`. When
> it closes, focus is returned to the trigger.

```jsx
<Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>
```

## Rendering the Popover in a Portal

By default, the Popover doesn't render in a Portal. To make them display in a
portal, pass the `usePortal` prop.

> You might need to **Inspect Element** to see this in action. Notice the
> `PopoverContent` is rendered as a child of `<body>`

```jsx
<Popover usePortal>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverHeader>Header</PopoverHeader>
    <PopoverCloseButton />
    <PopoverBody>
      <Button colorScheme="blue">Button</Button>
    </PopoverBody>
    <PopoverFooter>This is the footer</PopoverFooter>
  </PopoverContent>
</Popover>
```
