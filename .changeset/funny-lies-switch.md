---
"@chakra-ui/layout": patch
---

Prevent Stack from crashing when there's a lot of children

NB: This does not help improve loading and refresh performance otherwise,
libraries like `react-virtualized` should be used to handle large lists.
