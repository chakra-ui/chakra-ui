---
"@chakra-ui/number-input": patch
---

Fix issue where input spins unexpectedly on right clicking the increment or
decrement button with a pointer.

Now, only left click (or primary button) will trigger a value change.
