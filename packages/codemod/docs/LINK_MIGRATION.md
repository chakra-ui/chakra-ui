# Link Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 Link component to the v3 API.

## Overview

In v3, the Link component's `isExternal` prop has been removed in favor of
standard HTML attributes. The codemod automatically transforms `isExternal` to
the appropriate `target` and `rel` attributes.

## Key Changes

**`isExternal` prop removed**: The convenience prop is replaced with explicit
`target="_blank"` and `rel="noopener noreferrer"` attributes for better
standards compliance and clarity.

## Transformation Details

When `isExternal` is present:

1. The `isExternal` prop is removed
2. `target="_blank"` is added (if not already present)
3. `rel="noopener noreferrer"` is added (if not already present)

### Why this change?

- **Standards alignment**: Uses standard HTML attributes instead of a custom
  prop
- **Explicit behavior**: Makes the external link behavior more visible in code
- **Better control**: Allows developers to customize `target` and `rel` values
  if needed
- **Security**: Ensures `rel="noopener noreferrer"` is always added for security
  best practices

## Transformation Examples

### Basic isExternal

**v2:**

```tsx
import { Link } from "@chakra-ui/react"

;<Link href="https://chakra-ui.com" isExternal>
  Chakra UI
</Link>
```

**v3:**

```tsx
import { Link } from "@chakra-ui/react"

;<Link href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer">
  Chakra UI
</Link>
```

### isExternal with Boolean Value

**v2:**

```tsx
;<Link href="https://chakra-ui.com" isExternal={true}>
  Chakra UI
</Link>
```

**v3:**

```tsx
;<Link href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer">
  Chakra UI
</Link>
```

### Preserving Existing target

If you already have a `target` attribute, it's preserved:

**v2:**

```tsx
;<Link href="https://chakra-ui.com" isExternal target="_self">
  Chakra UI
</Link>
```

**v3:**

```tsx
;<Link href="https://chakra-ui.com" target="_self" rel="noopener noreferrer">
  Chakra UI
</Link>
```

### Preserving Existing rel

If you already have a `rel` attribute, it's preserved:

**v2:**

```tsx
;<Link href="https://chakra-ui.com" isExternal rel="nofollow">
  Chakra UI
</Link>
```

**v3:**

```tsx
;<Link href="https://chakra-ui.com" rel="nofollow" target="_blank">
  Chakra UI
</Link>
```

### Multiple Links

**v2:**

```tsx
import { Link, Stack } from "@chakra-ui/react"

function Links() {
  return (
    <Stack>
      <Link href="https://chakra-ui.com" isExternal>
        Chakra UI
      </Link>
      <Link href="https://github.com" isExternal>
        GitHub
      </Link>
      <Link href="/docs">Documentation</Link>
    </Stack>
  )
}
```

**v3:**

```tsx
import { Link, Stack } from "@chakra-ui/react"

function Links() {
  return (
    <Stack>
      <Link
        href="https://chakra-ui.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Chakra UI
      </Link>
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        GitHub
      </Link>
      <Link href="/docs">Documentation</Link>
    </Stack>
  )
}
```

## LinkOverlay Component

The transformation also applies to `LinkOverlay`:

**v2:**

```tsx
import { LinkBox, LinkOverlay } from "@chakra-ui/react"

;<LinkBox>
  <LinkOverlay href="https://chakra-ui.com" isExternal>
    Chakra UI
  </LinkOverlay>
</LinkBox>
```

**v3:**

```tsx
import { LinkBox, LinkOverlay } from "@chakra-ui/react"

;<LinkBox>
  <LinkOverlay
    href="https://chakra-ui.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    Chakra UI
  </LinkOverlay>
</LinkBox>
```

## Complete Example

### Before (v2)

```tsx
import { Box, Link, Stack, Text } from "@chakra-ui/react"

function Footer() {
  return (
    <Box as="footer" py={8}>
      <Stack spacing={4}>
        <Text>External Links:</Text>
        <Stack direction="row" spacing={4}>
          <Link href="https://chakra-ui.com" isExternal color="blue.500">
            Chakra UI
          </Link>
          <Link href="https://github.com/chakra-ui" isExternal color="blue.500">
            GitHub
          </Link>
          <Link
            href="https://twitter.com/chakra_ui"
            isExternal
            color="blue.500"
          >
            Twitter
          </Link>
        </Stack>

        <Text>Internal Links:</Text>
        <Stack direction="row" spacing={4}>
          <Link href="/about">About</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
        </Stack>
      </Stack>
    </Box>
  )
}
```

### After (v3)

```tsx
import { Box, Link, Stack, Text } from "@chakra-ui/react"

function Footer() {
  return (
    <Box as="footer" py={8}>
      <Stack spacing={4}>
        <Text>External Links:</Text>
        <Stack direction="row" spacing={4}>
          <Link
            href="https://chakra-ui.com"
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            Chakra UI
          </Link>
          <Link
            href="https://github.com/chakra-ui"
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            GitHub
          </Link>
          <Link
            href="https://twitter.com/chakra_ui"
            target="_blank"
            rel="noopener noreferrer"
            color="blue.500"
          >
            Twitter
          </Link>
        </Stack>

        <Text>Internal Links:</Text>
        <Stack direction="row" spacing={4}>
          <Link href="/about">About</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
        </Stack>
      </Stack>
    </Box>
  )
}
```

## Props Preserved

All other Link props are preserved unchanged:

| Prop             | v2  | v3  | Notes                        |
| ---------------- | --- | --- | ---------------------------- |
| `href`           | ✅  | ✅  | Unchanged                    |
| `color`          | ✅  | ✅  | Unchanged                    |
| `fontSize`       | ✅  | ✅  | Unchanged                    |
| `fontWeight`     | ✅  | ✅  | Unchanged                    |
| `textDecoration` | ✅  | ✅  | Unchanged                    |
| `isExternal`     | ✅  | ❌  | → target + rel               |
| `target`         | ✅  | ✅  | Preserved if already present |
| `rel`            | ✅  | ✅  | Preserved if already present |
| All other props  | ✅  | ✅  | Unchanged                    |

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform link src/**/*.tsx
```

## Manual Review Required

After running the codemod, review:

1. **Custom target values**: If you had `isExternal` with a custom `target`
   value, ensure it's still correct:

   ```tsx
   // Before: Opens in same window despite isExternal
   <Link href="..." isExternal target="_self">

   // After: target="_self" is preserved
   <Link href="..." target="_self" rel="noopener noreferrer">
   ```

2. **Custom rel values**: If you need additional `rel` values beyond
   `noopener noreferrer`, add them:

   ```tsx
   // Add additional rel values if needed
   <Link
     href="https://example.com"
     target="_blank"
     rel="noopener noreferrer nofollow"
   >
     Example
   </Link>
   ```

3. **Conditional isExternal**: If `isExternal` was conditional, you may need to
   refactor:

   ```tsx
   // v2: Conditional external link
   <Link href={url} isExternal={isExternalUrl}>
     {text}
   </Link>

   // v3: Consider a helper or conditional attributes
   <Link
     href={url}
     {...(isExternalUrl && {
       target: "_blank",
       rel: "noopener noreferrer",
     })}
   >
     {text}
   </Link>
   ```

4. **Link analytics**: If you track external link clicks, update your tracking
   to use `target="_blank"` instead of `isExternal`:

   ```tsx
   // Update analytics/tracking code
   const handleClick = (e) => {
     if (e.currentTarget.target === "_blank") {
       trackExternalLinkClick(e.currentTarget.href)
     }
   }
   ```

## Security Note

The `rel="noopener noreferrer"` attribute is important for security when opening
links in new tabs. It prevents the new page from accessing the `window.opener`
object and protects against tabnabbing attacks.

- **`noopener`**: Prevents the new page from accessing `window.opener`
- **`noreferrer`**: Prevents the browser from sending the referrer header

The codemod automatically adds these for all `isExternal` links. If you
customize the `rel` attribute, ensure you include these values for external
links.

## Troubleshooting

### Links not opening in new tab

**Problem**: External links don't open in new tabs after migration.

**Solution**: Verify `target="_blank"` was added:

```tsx
// ✅ Correct - will open in new tab
<Link href="..." target="_blank" rel="noopener noreferrer">

// ❌ Wrong - missing target
<Link href="..." rel="noopener noreferrer">
```

### TypeScript errors about target/rel

**Problem**: TypeScript complains about `target` or `rel` props.

**Solution**: Ensure you're using the latest `@chakra-ui/react` types. These are
standard HTML attributes and should be supported.

### Next.js Link conflicts

**Problem**: Using Chakra Link with Next.js Link wrapper.

**Solution**: Next.js Link handles the `<a>` tag, so apply attributes to Chakra
Link:

```tsx
import NextLink from "next/link"
import { Link as ChakraLink } from "@chakra-ui/react"

// Next.js 13+ with App Router
<ChakraLink href="..." target="_blank" rel="noopener noreferrer">
  External Link
</ChakraLink>

// Or with explicit NextLink wrapper
<NextLink href="..." passHref legacyBehavior>
  <ChakraLink target="_blank" rel="noopener noreferrer">
    External Link
  </ChakraLink>
</NextLink>
```

## Additional Resources

- [Link Documentation](https://chakra-ui.com/docs/components/link)
- [LinkBox Documentation](https://chakra-ui.com/docs/components/linkbox)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
- [MDN: rel="noopener noreferrer"](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener)
