---
"@chakra-ui/react": patch
---

**Updated Ark UI to v5.39.2**

Keeps the pinned Ark version current. 5.39.2 restores the `./hotkeys` and
`./interaction` entrypoints that were dropped from the published package in
5.39.0/5.39.1, and includes a `NavigationMenu.Content` SSR fix (a component
Chakra does not ship). No behavior change for existing consumers.
