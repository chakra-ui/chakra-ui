---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

Fix issue where the checked ring of `RadioCard` and `CheckboxCard` (outline
variant) gets clipped when a parent has `overflow: hidden|auto|scroll`. The ring
is now drawn with an inset shadow instead of an outer shadow.
