---
"@chakra-ui/styled-system": patch
---

Improve style computation performance by looping over styles once.

Previously, we had two steps in the logic (expand responsive and convert to css
object). This can be quite expensive with large css objects (or style props).

We now process both steps in a single pass.
