---
"@chakra-ui/react": minor
---

- **Breadcrumb**: Prevent screen reader from reading the separator
- **Toast**: Added toast queuing when the max limit is reached:

  - New toasts were queued instead of dropped
  - Queued toasts were shown when space became available
  - Queue cleared when all toasts were removed

- **SegmentGroup**: Fix issue where `disabled` prop was not being applied to
  `SegmentGroup.Items`

- **RatingGroup**: Fix issue where half-filled icons were not being displayed
  correctly in RTL

- **Collapsible**: Fixed issue in React.js <= v18.x where collapse animation
  might not work as expected
