---
"@chakra-ui/theme": patch
---

Tag component variants borderRadius was overwriting baseStyle eventhough
borderRadius was same for all variants. borderRadius is now part of the
baseStyle
