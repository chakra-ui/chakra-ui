---
"@chakra-ui/storybook-addon": minor
---

Bumps Storybook deps to latest (7.5.3) and updates the tooling

- Toggling state for color mode originally used Storybook's `useAddonState` api
  hook. However, this hook is not reliable to persistent allow toggling of
  boolean state. Replaces this hook with React's `useState` as this state is a
  primitive.
- Makes use of the `makeDecorator` function to make this addon more like an
  official Storybook addon.
- Removes unneeded props from the button components that were originally part of
  a Type error bug.
