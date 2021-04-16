---
"@chakra-ui/utils": minor
---

- Add pan session class to handle pan gestures. This is used in the slider logic
  and sharable with vue library.

- Perf: Throttle pan move events to once per frame which improves the slider's
  `onChange` call performance.

- Update types for internal pointer event
