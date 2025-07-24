---
"@chakra-ui/react": patch
---

Fix HTML semantic structure for `Breadcrumb.Ellipsis` component by changing the
underlying element from `<span>` to `<li>`.

```tsx
// Before: <span> inside <ol> (invalid HTML)
<Breadcrumb.List>
  <Breadcrumb.Ellipsis /> {/* rendered as <span> */}
</Breadcrumb.List>

// After: <li> inside <ol> (valid HTML)
<Breadcrumb.List>
  <Breadcrumb.Ellipsis /> {/* now renders as <li> */}
</Breadcrumb.List>
```
