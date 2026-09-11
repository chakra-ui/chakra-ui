---
"@chakra-ui/react": patch
---

**Updated Ark UI to v5.39.1**

Maintenance bump to keep the pinned Ark version current. The only fix in this
release is `NavigationMenu.Content` throwing `document is not defined` during
SSR, a component Chakra does not ship, so there is no behavior change for
consumers.
