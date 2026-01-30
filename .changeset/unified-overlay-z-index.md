---
"@chakra-ui/react": patch
---

Fix issue where `Dialog` appears below `Popover` when triggered from within it.

Unified z-index for overlay components (`Dialog`, `Drawer`, `Menu`, `HoverCard`)
to use `zIndex.popover` and `--layer-index` for proper stacking.
