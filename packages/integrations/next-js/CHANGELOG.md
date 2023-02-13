# @chakra-ui/next-js

## 2.0.1

### Patch Changes

- [#7329](https://github.com/chakra-ui/chakra-ui/pull/7329)
  [`b2b5d3545`](https://github.com/chakra-ui/chakra-ui/commit/b2b5d35452bf8a7a6ed16fba0f76e1037ce9986d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Introducing a new
  Next.js integration package that provides a smoother experience when using
  Chakra UI in your Next.js 13 apps.

  This package provides 2 main features:

  - **CacheProvider**: This component composes the Emotion.js' cache provider
    with the `useServerInsertedHTML` hook from `next/navigation`.

    This is necessary to ensure that computed styles are included in the initial
    server payload (during streaming).

    The `use client` directive is still required to be added to the top of the
    page-related file. This is a limitation of CSS-in-JS libraries and Emotion
    for now.

    > Note: Make sure to include the `<head>` tag in your layout component
    > otherwise it will not work.

    ```jsx live=false
    // app/layout.tsx
    "use client"
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

  - **Link**: This component combines the functionality of the Next.js `Link`
    and Chakra UI `Link` components.

  ```jsx live=false
  // app/page.tsx
  "use client"
  import { Link } from "@chakra-ui/next-js"

  export default function Page() {
    return (
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
    )
  }
  ```

  > Support for `next/image` coming soon!
