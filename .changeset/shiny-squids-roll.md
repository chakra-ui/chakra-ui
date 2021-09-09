---
"@chakra-ui/modal": patch
---

Drawer: omit the `motionPreset` prop type since `Drawer` only implements the
`Slide` transition, unlike `Modal` that allows you switch its motion preset.
