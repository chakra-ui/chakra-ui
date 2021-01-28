---
"@chakra-ui/hooks": patch
---

**useOutsideClick:**

- Update reference to `document.addEventListener` to detect owner document based
  on `ref` passed. This would help detect outside click currently from within an
  `iframe`.
