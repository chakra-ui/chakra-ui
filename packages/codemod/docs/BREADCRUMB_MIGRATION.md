# Breadcrumb Component Migration Guide

This guide explains how to migrate from Chakra UI v2 Breadcrumb components to
the v3 compound component API.

## Overview

In Chakra UI v3, the Breadcrumb component has been redesigned to use a compound
component pattern with explicit separators. This provides better control over
structure, styling, and accessibility.

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest breadcrumb <path>
```

This will automatically transform all Breadcrumb components in your codebase.

## Component Structure Changes

### v2 (Flat Structure)

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

;<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink href="#">Current</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

### v3 (Compound Component)

```tsx
import { Breadcrumb } from "@chakra-ui/react"

;<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>Current</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

**Key Changes:**

1. `Breadcrumb` → `Breadcrumb.Root`
2. Children wrapped in `Breadcrumb.List`
3. `BreadcrumbItem` → `Breadcrumb.Item`
4. `BreadcrumbLink` → `Breadcrumb.Link` or `Breadcrumb.CurrentLink`
5. Explicit `<Breadcrumb.Separator />` between items

---

## Import Changes

### Before (v2)

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react"
```

### After (v3)

```tsx
import { Breadcrumb } from "@chakra-ui/react"
```

All subcomponents are accessed via `Breadcrumb.*` (compound component pattern).

---

## Prop Transformations

### Breadcrumb (Root) Props

#### spacing → gap

**Before (v2):**

```tsx
<Breadcrumb spacing="8px">{/* items */}</Breadcrumb>
```

**After (v3):**

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List gap="8px">{/* items */}</Breadcrumb.List>
</Breadcrumb.Root>
```

**Changes:**

- `spacing` prop moved to `Breadcrumb.List` and renamed to `gap`

---

#### separator → Explicit Separators

The `separator` prop has been removed in favor of explicit
`<Breadcrumb.Separator />` components.

**Before (v2) - String Separator:**

```tsx
<Breadcrumb separator="-">
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">About</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

**After (v3):**

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>-</Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">About</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

**Before (v2) - Icon Separator:**

```tsx
import { ChevronRightIcon } from "@chakra-ui/icons"

;<Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="#">About</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

**After (v3):**

```tsx
import { ChevronRightIcon } from "@chakra-ui/icons"

;<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRightIcon color="gray.500" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">About</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

**Changes:**

- `separator` prop → explicit `<Breadcrumb.Separator>` components between items
- The codemod automatically inserts separators between all items
- Default separator (empty) is used if no `separator` prop was present

---

#### listProps → Spread on List

**Before (v2):**

```tsx
<Breadcrumb listProps={{ className: "custom-list", id: "breadcrumb" }}>
  {/* items */}
</Breadcrumb>
```

**After (v3):**

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List className="custom-list" id="breadcrumb">
    {/* items */}
  </Breadcrumb.List>
</Breadcrumb.Root>
```

**Changes:**

- `listProps` → spread directly on `Breadcrumb.List`

---

### BreadcrumbItem Props

#### isCurrentPage → Use CurrentLink

**Before (v2):**

```tsx
<BreadcrumbItem isCurrentPage>
  <BreadcrumbLink href="#">Current</BreadcrumbLink>
</BreadcrumbItem>
```

**After (v3):**

```tsx
<Breadcrumb.Item>
  <Breadcrumb.Link href="#">Current</Breadcrumb.Link>
</Breadcrumb.Item>
```

**⚠️ Note:** The `isCurrentPage` prop is removed from `BreadcrumbItem`. To mark
a page as current, use `isCurrentPage` on `BreadcrumbLink` (see below) or use
`Breadcrumb.CurrentLink` directly.

---

#### isLastChild → Removed

**Before (v2):**

```tsx
<BreadcrumbItem isLastChild>
  <BreadcrumbLink href="#">Last</BreadcrumbLink>
</BreadcrumbItem>
```

**After (v3):**

```tsx
<Breadcrumb.Item>
  <Breadcrumb.Link href="#">Last</Breadcrumb.Link>
</Breadcrumb.Item>
```

**Changes:**

- `isLastChild` prop is removed (no longer needed with explicit separators)

---

#### spacing → gap

**Before (v2):**

```tsx
<BreadcrumbItem spacing="2">
  <BreadcrumbLink href="#">Home</BreadcrumbLink>
</BreadcrumbItem>
```

**After (v3):**

```tsx
<Breadcrumb.Item gap="2">
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
</Breadcrumb.Item>
```

**Changes:**

- `spacing` → `gap`

---

### BreadcrumbLink Props

#### isCurrentPage → CurrentLink Component

**Before (v2):**

```tsx
<BreadcrumbItem>
  <BreadcrumbLink href="#" isCurrentPage>
    Current
  </BreadcrumbLink>
</BreadcrumbItem>
```

**After (v3):**

```tsx
<Breadcrumb.Item>
  <Breadcrumb.CurrentLink href="#">Current</Breadcrumb.CurrentLink>
</Breadcrumb.Item>
```

**Changes:**

- `BreadcrumbLink` with `isCurrentPage` → `Breadcrumb.CurrentLink`
- `isCurrentPage` prop is removed

---

## Complete Examples

### Example 1: Basic Breadcrumb

**Before (v2):**

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
```

**After (v3):**

```tsx
import { Breadcrumb } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Breadcrumb</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
```

---

### Example 2: Custom Separator and Spacing

**Before (v2):**

```tsx
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
```

**After (v3):**

```tsx
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="8px">
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightIcon color="gray.500" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">About</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <ChevronRightIcon color="gray.500" />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Contact</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
```

---

### Example 3: With Style Props

**Before (v2):**

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">About</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
```

**After (v3):**

```tsx
import { Breadcrumb } from "@chakra-ui/react"

export default function App() {
  return (
    <Breadcrumb.Root fontWeight="medium" fontSize="sm">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">About</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Current</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
```

---

## Manual Migration Steps

After running the codemod, review your code for:

1. **Current page indication** - Verify that `Breadcrumb.CurrentLink` is used
   for current pages
2. **Separator styling** - Check that custom separators render correctly
3. **Spacing** - Verify `gap` prop on `Breadcrumb.List` provides the desired
   spacing
4. **Accessibility** - Ensure `aria-current="page"` is set on current links
   (automatic with `CurrentLink`)

---

## Known Limitations

### isCurrentPage on BreadcrumbItem

If you have `isCurrentPage` on `BreadcrumbItem` (not on `BreadcrumbLink`), the
codemod will remove the prop but won't automatically convert the link to
`CurrentLink`. You may need to manually change these:

```tsx
// This pattern may need manual adjustment
<BreadcrumbItem isCurrentPage>
  <BreadcrumbLink href='#'>Current</BreadcrumbLink>
</BreadcrumbItem>

// Should become:
<Breadcrumb.Item>
  <Breadcrumb.CurrentLink href='#'>Current</Breadcrumb.CurrentLink>
</Breadcrumb.Item>
```

**Workaround:** Use `isCurrentPage` on `BreadcrumbLink` in v2 code before
running the codemod.

---

## Testing

After migration, test:

1. **Visual appearance** - Check that breadcrumbs render correctly
2. **Separators** - Verify custom separators display as expected
3. **Current page styling** - Ensure current page is visually distinct
4. **Keyboard navigation** - Test tab order and keyboard interaction
5. **Screen readers** - Verify ARIA labels and current page announcement

---

## Benefits of v3 Structure

1. **Explicit control** - Separators are explicit elements you can style
2. **Better composition** - Clear parent-child relationships
3. **Improved accessibility** - Semantic HTML structure with proper ARIA
4. **Flexible styling** - Style any part independently
5. **Type safety** - Better TypeScript support with compound components

---

## Need Help?

If you encounter issues during migration:

1. Check the
   [Breadcrumb component documentation](https://chakra-ui.com/docs/components/breadcrumb)
2. Review the [migration guide](https://chakra-ui.com/docs/migration)
3. Open an issue on [GitHub](https://github.com/chakra-ui/chakra-ui/issues)

---

## See Also

- [Breadcrumb Component Documentation](https://chakra-ui.com/docs/components/breadcrumb)
- [Compound Components Pattern](https://chakra-ui.com/docs/components/concepts/composition)
- [Chakra UI v3 Migration Guide](https://chakra-ui.com/docs/migration)
