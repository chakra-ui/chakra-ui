---
"@chakra-ui/react": patch
---

- **createOverlay**: Fix `document.body` scroll lock and `pointer-events` not
  being restored when overlays are used under React `StrictMode`.
