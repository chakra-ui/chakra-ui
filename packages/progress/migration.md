# Migration Notes

## Changes

- The `Progress` and `CircularProgress` components are now under the same
  package.

```jsx
import {
  Progress,
  ProgressLabel
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/progress"
```

- Support for the `color` prop has been deprecated. Use `colorScheme` prop
  instead.

For example, `<Progress colorScheme="blue"/>`

```jsx
// before
<Progress color="blue"/>

// after
<Progress colorScheme="blue"/>
```
