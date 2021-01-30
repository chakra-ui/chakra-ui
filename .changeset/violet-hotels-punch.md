---
"@chakra-ui/portal": minor
---

- Add support for changing the container that portal is appended to. You can now
  pass `containerRef` to portal.
- Update portal `README.md` and tests.
- Add support for `appendToParentPortal={false}` to opt out of nested portals.
- Fix issue with portal `zIndex` container where it renders elements outside of
  view.
