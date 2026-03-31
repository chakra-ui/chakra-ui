---
"@chakra-ui/react": minor
---

**Pagination**: Allow `format` prop in `Pagination.PageText` to accept a
function for i18n support.

```tsx
<Pagination.PageText
  format={({ page, totalPages }) => `Page ${page} de ${totalPages}`}
/>
```
