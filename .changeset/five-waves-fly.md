---
"@chakra-ui/react": patch
---

- Remove unused dependency from package.json

- **Popover**: Fix issue where popover doesn't use the correct zIndex token.

- **Skeleton**: Add support for overriding animation via the `animation` prop.

- **PinInput**: Allow passing `index` to `PinInputField` to set current `id` in
  SSR.

- **Popover**: Fix issue where popover not closing on outside click when it's
  not focused

- **Menu**: Fix issue where popover doesn't focus the first item consistently
  when `isLazy` is `true`
