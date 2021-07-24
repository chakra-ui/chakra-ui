---
"@chakra-ui/layout": patch
---

fix(Stack): Ensure that when cloning children, their provided keys are preferred
over index. This prevents them from being destroyed and recreated when a child's
position in the list changes.
