---
"@chakra-ui/react": patch
---

Add a default `minSize` of `{ width: 240, height: 100 }` to `FloatingPanel.Root`
to prevent the panel from being resized to zero. Pass your own `minSize` to
override it.
