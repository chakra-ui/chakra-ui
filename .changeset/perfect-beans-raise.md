---
"@chakra-ui/tabs": minor
"@chakra-ui/popover": minor
"@chakra-ui/menu": minor
---

This change restores the behavior of the `isLazy` prop (which was broken by the
previous release) and adds a new `lazyBehavior` prop which configures the
behavior of `isLazy`.

If you'd like the content of tab panel, popover and menu components to be
unmounted when not selected or opened, please continue to use `isLazy`. This is
the default behavior.

If you'd like the content of tab panel, popover and menu components to remain
mounted (but hidden) after it was previously selected or opened, use
`lazyBehavior="keepMounted"` in combination with `isLazy`.
