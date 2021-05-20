---
"@chakra-ui/popper": minor
"@chakra-ui/menu": patch
"@chakra-ui/popover": patch
"@chakra-ui/tooltip": patch
---

Add `enabled` option to `usePopper` hook.

The `popper.js` instance will not be created until this option is `true`.

`Menu`, `Popover` and `Tooltip` components now use this option, so the
`popper.js` instance is created only once the popper is open. This should
significantly improve render and scroll performance.
