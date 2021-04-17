---
"@chakra-ui/tabs": minor
---

This change restores the behavior of the `isLazy` prop (which was broken by
`@chakra-ui/tabs@1.3.2`) and adds a new `unmountHiddenPanels` prop which
configures the behavior of `isLazy`.

If you'd like for your tab panel components to be unmounted when a different tab
is selected, please continue to use `isLazy`. This is the default behavior.

If you'd like for your tab panel components to remain mounted (but hidden) after
when a different tab is selected, use `unmountHiddenPanels={false}` in
combination with `isLazy`.
