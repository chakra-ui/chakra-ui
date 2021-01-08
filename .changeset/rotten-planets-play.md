---
"@chakra-ui/portal": patch
---

- Fix issue where `Portal` and `PortalManager` renders elements outside of view.

- Fixed issue where elements within portal used in an `iframe` got rendered
  outside of the `iframe`. `Portal` now smartly detects it's document owner and
  attaches its node to the correct `document.body`

- Removed extra DOM node `PortalManager` creates. Less is more!
