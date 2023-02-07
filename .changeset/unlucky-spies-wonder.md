---
"@chakra-ui/next-js": patch
---

Introducing a new Next.js integration package that provides a smoother
experience when using Chakra UI in your Next.js 13 apps.

This package provides 2 main features:

```jsx live=false
// app/layout.tsx
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
```

This also introduces a new `Link` component that combines the Next.js `Link` and
Chakra UI `Link` components.

```jsx live=false
// app/layout.tsx
import { Link } from "@chakra-ui/next-js"

export default function Page() {
  return (
    <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
      About
    </Link>
  )
}
```
