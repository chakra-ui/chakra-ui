---
"@chakra-ui/button": major
"@chakra-ui/checkbox": major
"@chakra-ui/color-mode": major
"@chakra-ui/hooks": major
"@chakra-ui/input": major
"@chakra-ui/layout": major
"@chakra-ui/media-query": major
"@chakra-ui/number-input": major
"@chakra-ui/radio": major
"@chakra-ui/select": major
"@chakra-ui/styled-system": major
"@chakra-ui/textarea": major
"@chakra-ui/theme": major
---

### Remove deprecations

**Affected components or packages:**

**Button, Icon Button, Input, NumberInput, Radio, Checkbox, Select**

- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Checkbox**

- Removed `defaultIsChecked`. Use `defaultChecked`

**Color mode**

- Removed references to `--chakra-ui-color-mode`. Use `data-theme` property
  instead

**Hooks**

- Removed `useEventCallback` hook

**Input / NumberInput**

- Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

**Grid**

- Removed the `area` prop from `Grid` component. Should be passed to the
  `GridItem` instead.

- Radio
- Textarea
- Theme

**Styled system**

- Removed the `d` style prop. Use `display` instead.
- Removed the `isTruncated` style prop. Use `noOfLines={1}` instead.

**Theme**

- Removed deprecated types.
