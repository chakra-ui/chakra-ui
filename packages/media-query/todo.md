# Tasks

This package should provide access to all common media query in web and mobile
web apps. It should shop the following:

- `useAnimationPreference`: Tells us if the platform is requesting that
  animations be disabled or reduced as much as possible. Should return `boolean`

- `useColorModePreference`: Tells us if the platform wants to use light or dark
  mode.

- `useViewportSize`: Tells us about the logical width and height of a component

- `useBreakpoint`: Tells us about the current breakpoint based on the
  breakpoints specified in theme.

- `useBreakpointValue`: Similar to passing a responsive prop to Chakra's
  components.

  ```tsx
  const size = useBreakpointValue({ base: "30px", md: "50px" })

  function App() {
    return <Button size={size}>This is a box</Button>
  }
  ```
