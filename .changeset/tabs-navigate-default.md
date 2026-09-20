---
"@chakra-ui/react": patch
---

Fix `Tabs` clicking link triggers when the value changes programmatically. In a
controlled `Tabs.Root`, syncing `value` made the tabs machine dispatch a
synthetic click on the newly selected trigger, hard-navigating the browser when
triggers are rendered `asChild` onto anchors (breaking client-side routing in
Next.js App Router). The default `navigate` behavior is now disabled; real user
clicks still follow links natively and a user-provided `navigate` prop still
takes precedence.
