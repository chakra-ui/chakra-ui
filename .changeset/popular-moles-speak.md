---
"@chakra-ui/accordion": patch
"@chakra-ui/alert": patch
"@chakra-ui/anatomy": patch
"@chakra-ui/avatar": patch
"@chakra-ui/breadcrumb": patch
"@chakra-ui/button": patch
"@chakra-ui/card": patch
"@chakra-ui/checkbox": patch
"@chakra-ui/clickable": patch
"@chakra-ui/close-button": patch
"@chakra-ui/color-mode": patch
"@chakra-ui/control-box": patch
"@chakra-ui/counter": patch
"@chakra-ui/css-reset": patch
"@chakra-ui/descendant": patch
"@chakra-ui/editable": patch
"@chakra-ui/react-env": patch
"@chakra-ui/focus-lock": patch
"@chakra-ui/form-control": patch
"@chakra-ui/icon": patch
"@chakra-ui/icons": patch
"@chakra-ui/image": patch
"@chakra-ui/input": patch
"@chakra-ui/layout": patch
"@chakra-ui/live-region": patch
"@chakra-ui/media-query": patch
"@chakra-ui/menu": patch
"@chakra-ui/modal": patch
"@chakra-ui/number-input": patch
"@chakra-ui/pin-input": patch
"@chakra-ui/popover": patch
"@chakra-ui/popper": patch
"@chakra-ui/portal": patch
"@chakra-ui/progress": patch
"@chakra-ui/provider": patch
"@chakra-ui/radio": patch
"@chakra-ui/react": patch
"@chakra-ui/select": patch
"@chakra-ui/skeleton": patch
"@chakra-ui/skip-nav": patch
"@chakra-ui/slider": patch
"@chakra-ui/spinner": patch
"@chakra-ui/stat": patch
"@chakra-ui/switch": patch
"@chakra-ui/table": patch
"@chakra-ui/tabs": patch
"@chakra-ui/tag": patch
"@chakra-ui/textarea": patch
"@chakra-ui/theme": patch
"@chakra-ui/theme-tools": patch
"@chakra-ui/toast": patch
"@chakra-ui/tooltip": patch
"@chakra-ui/transition": patch
"@chakra-ui/visually-hidden": patch
"@chakra-ui/styled-system": patch
"@chakra-ui/system": patch
"@chakra-ui/react-context": patch
"@chakra-ui/react-use-animation-state": patch
"@chakra-ui/react-use-callback-ref": patch
"@chakra-ui/react-use-controllable-state": patch
"@chakra-ui/react-use-disclosure": patch
"@chakra-ui/react-use-event-listener": patch
"@chakra-ui/react-use-focus-effect": patch
"@chakra-ui/react-use-focus-on-pointer-down": patch
"@chakra-ui/react-use-interval": patch
"@chakra-ui/react-use-latest-ref": patch
"@chakra-ui/react-use-merge-refs": patch
"@chakra-ui/react-use-outside-click": patch
"@chakra-ui/react-use-pan-event": patch
"@chakra-ui/react-use-previous": patch
"@chakra-ui/react-use-safe-layout-effect": patch
"@chakra-ui/react-use-size": patch
"@chakra-ui/react-use-timeout": patch
"@chakra-ui/react-use-update-effect": patch
"@chakra-ui/hooks": patch
"@chakra-ui/react-utils": patch
"@chakra-ui/utils": patch
"@chakra-ui/breakpoint-utils": patch
"@chakra-ui/dom-utils": patch
"@chakra-ui/event-utils": patch
"@chakra-ui/lazy-utils": patch
"@chakra-ui/merge-utils": patch
"@chakra-ui/number-utils": patch
"@chakra-ui/object-utils": patch
"@chakra-ui/react-children-utils": patch
"@chakra-ui/react-types": patch
"@chakra-ui/shared-utils": patch
"@chakra-ui/theme-utils": patch
"@chakra-ui/storybook-addon": patch
---

## All components

Improved the bundling setup for all components.

- Switched to the `.mjs` file extension for correct ESM behavior
- Switched to the latest `tsup` will uses automatic JSX runtime detection
  removing the need for manually inject classic `React` import
- Moved `tsup` config to `package.json` since it's very minimal
- Removed `clean-package.config.json` in favor of the `package.json` property
- Fixed issue where Storybook addon (dark mode and RTL) was not working