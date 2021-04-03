---
"@chakra-ui/popover": minor
---

Return prop getters for popover header and body and use `ref` callback to
determine element's presense instead of `useEffect`.

Mark `usePopover` as internal for now.

Add support for `rootProps` to `PopoverContent` to allow passing props to
popover's positioner.
