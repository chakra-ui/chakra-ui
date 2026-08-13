---
"@chakra-ui/react": patch
---

- **RadioCard**: Fix `outline` variant border-width appearing reduced when
  disabled and checked. The `itemControl`'s disabled background
  (`bg.muted`) was covering the `item`'s checked inset box-shadow ring,
  making the visual border appear thinner. Override the disabled
  background in the `outline` variant to prevent the shadow from being
  hidden.