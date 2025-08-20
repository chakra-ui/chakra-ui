---
"@chakra-ui/react": patch
---

- **System**: Implement preset for table `border-spacing` property and improve
  documentation

- **Menu**
  - Fix issue where `onCheckedChange` could be called twice on checkbox or radio
    item
  - Add `data-state` attribute for context menu trigger
  - Fix context menu positioning bug where reopening at the same coordinates
    fails to reposition

- **Radio Group**: Fixed issue where arrow key navigation doesn't apply
  `data-focus-visible` on the newly focused item.

- **Highlight**: Add `exactMatch` prop that enables whole-word matching using
  regex word boundaries.
