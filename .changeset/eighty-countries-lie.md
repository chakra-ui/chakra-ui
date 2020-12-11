---
"@chakra-ui/form-control": minor
"@chakra-ui/modal": minor
---

Add support for controlling focus lock across frames. A typical example is when
you open a modal in Codesandbox, it's impossible to type in the code editor due
to focus lock.

`react-focus-lock` exposes a prop that prevents this from happening. We updated
`FocusLock` and `Modal` components to allow users opt-in or opt-out of this
behavior

To learn more, check out this issue
[#2479](https://github.com/chakra-ui/chakra-ui/issues/2479)
