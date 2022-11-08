---
"@chakra-ui/tooltip": patch
---

Fixed issue where dynamically changing a tooltip's `isDisabled` when it is open
didn't have any effect.

Now, changing the `isDisabled` prop will close the tooltip leading to a more
consistent behavior.
