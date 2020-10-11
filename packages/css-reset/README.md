# @chakra-ui/css-reset

A CSS Reset component for Chakra UI components.

## Installation

```sh
npm i @chakra-ui/css-reset
# or
yarn add @chakra-ui/css-reset
```

## Disabling border for non-keyboard interactions

We've added global style for `focus-visible` in event you need to remove focus
styles for non-keyboard interactions.

```bash
# as a dependency
yarn add focus-visible

# at the root of your application
import "focus-visible/dist/focus-visible"
```
