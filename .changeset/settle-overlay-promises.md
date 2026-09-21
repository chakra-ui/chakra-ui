---
"@chakra-ui/react": patch
---

Fix `createOverlay` leaving promises pending forever when an overlay is removed.
`remove` and `removeAll` deleted the overlay without settling the promises
handed out by `open`, `close` and `waitForExit`, so any code awaiting them was
stuck. They now resolve with `undefined`.
