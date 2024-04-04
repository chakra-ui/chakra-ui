---
"@chakra-ui/react": minor
---

Add support for `_open` and `_closed` pseudo props for styling their respective
selectors.

- `_open`: `&[data-state=open], &[open]`
- `_closed`: `&[data-state=closed]`
- `_groupOpen`: `[data-group][data-state=open] &`
- `_groupClosed`: `[data-group][data-state=closed] &`

Extend the existing pseudo props to support new selectors`

- `_placeholder` now supports `&[data-placeholder]`
- `_placeholderShow` now supports `&[data-placeholder-shown]`
- `_fullscreen` now supports `&[data-fullscreen]`
- `_empty` now supports `&[data-empty]`
- `_expanded` now supports `&[data-state=expanded]`
- `_checked` now supports `&[data-state-checked]`
