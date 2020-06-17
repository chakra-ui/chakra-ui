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

- Support for `color` prop has been deprecated. Use `colorScheme` prop instead.

For example, `<Progress colorScheme="blue"/>`

```jsx
// before
<Progress color="blue"/>

// after
<Progress colorScheme="blue"/>
```

- Added Support for `isIndeterminate` prop in the `Progress` component

### CircularProgress

- `trackColor` prop now takes a specific color in theme or valid `css` color.
  This means you're now in full control of the styles.

Use the `useColorModeValue` hook to change the `trackColor` and `color` based on
color mode.

- `thickness` props now takes the actual thickness of the progress bar, not the
  thickness ratio.
