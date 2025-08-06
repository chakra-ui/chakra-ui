---
"@chakra-ui/react": patch
---

Fix issue where using `asChild` with invalid child elements or `React.lazy`
components would throw an error.

> This issue more commonly occurs when composing with Next.js `Link` component.

```tsx
import { Breadcrumb } from "@chakra-ui/react"
import Link from "next/link"

export default function Page() {
  return (
    <Breadcrumb.Root>
      {/* 🧨 Throws an error */}
      <Breadcrumb.Link asChild>
        <Link href="#">aaaa</Link>
      </Breadcrumb.Link>
    </Breadcrumb.Root>
  )
}
```
