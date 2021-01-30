---
"@chakra-ui/portal": minor
---

- Add support for changing the container that portal is appended to. You can now
  pass `containerRef` to portal.
- Update portal `README.md` and tests.
- Add support for `appendToParentPortal={false}` to opt out of nested portals.
- Fix issue with portal `zIndex` container where it renders elements outside of
  view.
- Renamed `getContainer` prop to `containerRef` to make it possible to pass the
  `ref` directly. This affects the `Modal` component primarily

```jsx live=false
// Before
<Portal getContainer={() => ref.current}>{/** Content */}</Portal>

// After
<Portal containerRef={ref}>{/** Content */}</Portal>
```
