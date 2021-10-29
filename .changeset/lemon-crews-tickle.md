---
"@chakra-ui/breadcrumb": patch
---

`href` attribute will no longer be set on the inner element of the
`BreadcrumbLink` if the parent `BreadcrumbItem` has `isCurrentPage` prop set to
true. Such a `BreadcrumbLink` is not an actual link and it ends up being a
`span` (by default).
