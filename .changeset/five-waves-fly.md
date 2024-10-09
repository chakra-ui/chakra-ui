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

- **Menu**

  - Fix issue where menu doesn't focus the first item consistently when `isLazy`
    is `true`
  - Fix issue where menu doesn't scroll the focused item into view when using
    the keyboard.

- **Descendants**: Fix issue were `createDescendantContext` does not create a
  fresh new context on each render.

- **Slider**: Fix issue where slider thumb flickers when used within tabs.

- **useSize**: Add support for `enabled` and `fallback` options.
