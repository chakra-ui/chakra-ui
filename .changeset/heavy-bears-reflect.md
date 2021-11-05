---
"@chakra-ui/modal": patch
---

`react-focus-lock@2.5.1` includes a dependency update of `focus-lock` from
`0.8.1` -> `0.9.1`. The change in `focus-lock` includes a fix for performance in
JSDOM: https://github.com/theKashey/focus-lock/pull/24

JSDOM is used when testing react components in jest and other unit testing
frameworks. In particular, when used with `@testing-library/react` for
simulating real user input.

Locally tested on an Apple M1 Air using a moderately complex `<Modal>` component
(which contained inputs, `react-hook-form` usage, etc). Before this change:
20,149ms After this change: 2,347ms

Approx. 10x performance increase.
