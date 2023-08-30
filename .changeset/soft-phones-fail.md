---
"@chakra-ui/tabs": major
---

Distored UI when device orientation or width is changed - On changing the device
width and change of device orientation, the tab indicator element which is
position absolute aligns realtive to the outer container element.

Hence, the position of immediate parent(tabs) is set to relative in this
fix.This makes sure, if the orientation changes the tab indicator is aligned
relative to its parent.
