---
"@chakra-ui/react": minor
---

- **Breadcrumb**: Prevent screen reader from reading the separator
- **Toast**: Added toast queuing when the max limit is reached:
  - New toasts were queued instead of dropped
  - Queued toasts were shown when space became available
  - Queue cleared when all toasts were removed
