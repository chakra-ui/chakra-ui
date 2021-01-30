---
"@chakra-ui/modal": minor
"@chakra-ui/tooltip": minor
---

Add support for forwarding props to the underlying `Portal` component. Pass the
`portalProps` prop to achive this.

The 2 props you can pass to the portalProps are:

- `containerRef`: `ref` for the element where to mount the portal
- `appendToParentPortal`: If `false`, it'll opt out of portal nesting

```jsx
<Modal portalProps={{ containerRef: ref }}>
  <ModalOverlay />
  <ModalContent>
    <Box>Modal content</Box>
    <Tooltip portalProps={{ appendToParentPortal: false }}>
      Some tooltip
    </Tooltip>
  </ModalContent>
</Modal>
```
