---
"@chakra-ui/hooks": patch
---

Fixed issue where using an uncontrolled RadioGroup without a defaultValue causes multiple radio options can be selected.

This was caused by the `useControllableProp` hook that uses `useRef` to check if a value is controlled or uncontrolled.
