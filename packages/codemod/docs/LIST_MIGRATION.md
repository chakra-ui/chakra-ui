# List Component Migration Guide

This document outlines the migration from Chakra UI v2 List components to v3.

## Component Mapping

### v2 → v3

| v2 Component    | v3 Component     |
| --------------- | ---------------- |
| `List`          | `List.Root`      |
| `OrderedList`   | `List.Root`      |
| `UnorderedList` | `List.Root`      |
| `ListItem`      | `List.Item`      |
| `ListIcon`      | `List.Indicator` |

## Prop Changes

| v2 Prop         | v3 Prop             | Notes                               |
| --------------- | ------------------- | ----------------------------------- |
| `spacing`       | `gap`               | Renamed to align with CSS standards |
| `styleType`     | `listStyleType`     | Renamed to match CSS property name  |
| `stylePosition` | `listStylePosition` | Renamed to match CSS property name  |

## Ordered vs Unordered Lists

In v3, both ordered and unordered lists use `List.Root` with the `as` prop:

- `OrderedList` → `List.Root as="ol"`
- `UnorderedList` → `List.Root as="ul"`

The `as` prop tells the component which HTML element to render.

## Usage Examples

### Basic Unordered List

**v2:**

```tsx
import { ListItem, UnorderedList } from "@chakra-ui/react"

;<UnorderedList>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
</UnorderedList>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root as="ul">
  <List.Item>Lorem ipsum dolor sit amet</List.Item>
  <List.Item>Consectetur adipiscing elit</List.Item>
</List.Root>
```

### Basic Ordered List

**v2:**

```tsx
import { ListItem, OrderedList } from "@chakra-ui/react"

;<OrderedList>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
</OrderedList>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root as="ol">
  <List.Item>Lorem ipsum dolor sit amet</List.Item>
  <List.Item>Consectetur adipiscing elit</List.Item>
</List.Root>
```

### List with Spacing

**v2:**

```tsx
import { List, ListItem } from "@chakra-ui/react"

;<List spacing={3}>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root gap={3}>
  <List.Item>Item 1</List.Item>
  <List.Item>Item 2</List.Item>
</List.Root>
```

### List with Icons

**v2:**

```tsx
import { List, ListIcon, ListItem } from "@chakra-ui/react"
import { MdCheckCircle } from "react-icons/md"

;<List spacing={3}>
  <ListItem>
    <ListIcon as={MdCheckCircle} color="green.500" />
    Lorem ipsum dolor sit amet
  </ListItem>
  <ListItem>
    <ListIcon as={MdCheckCircle} color="green.500" />
    Consectetur adipiscing elit
  </ListItem>
</List>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"
import { MdCheckCircle } from "react-icons/md"

;<List.Root gap={3}>
  <List.Item>
    <List.Indicator as={MdCheckCircle} color="green.500" />
    Lorem ipsum dolor sit amet
  </List.Item>
  <List.Item>
    <List.Indicator as={MdCheckCircle} color="green.500" />
    Consectetur adipiscing elit
  </List.Item>
</List.Root>
```

### List with Custom Style Type

**v2:**

```tsx
import { ListItem, UnorderedList } from "@chakra-ui/react"

;<UnorderedList styleType="lower-roman">
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
</UnorderedList>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root as="ul" listStyleType="lower-roman">
  <List.Item>Lorem ipsum dolor sit amet</List.Item>
  <List.Item>Consectetur adipiscing elit</List.Item>
</List.Root>
```

### List with Style Position

**v2:**

```tsx
import { ListItem, OrderedList } from "@chakra-ui/react"

;<OrderedList stylePosition="inside">
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
</OrderedList>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root as="ol" listStylePosition="inside">
  <List.Item>Lorem ipsum dolor sit amet</List.Item>
  <List.Item>Consectetur adipiscing elit</List.Item>
</List.Root>
```

### Complete Example

**v2:**

```tsx
import { ListItem, UnorderedList } from "@chakra-ui/react"

;<UnorderedList spacing={2} styleType="circle" stylePosition="inside">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</UnorderedList>
```

**v3:**

```tsx
import { List } from "@chakra-ui/react"

;<List.Root as="ul" gap={2} listStyleType="circle" listStylePosition="inside">
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third item</List.Item>
</List.Root>
```

## Running the Codemod

To automatically migrate your List components, run:

```bash
npx @chakra-ui/codemod transform list <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform list ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform list ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform list ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually or need to handle edge cases:

1. **Import Changes**: Import `List` from `@chakra-ui/react` instead of
   individual component names
2. **Component Names**: Replace component names with their v3 equivalents using
   dot notation
3. **Ordered/Unordered**: Add `as="ol"` or `as="ul"` prop to `List.Root` for
   ordered/unordered lists
4. **Prop Names**: Rename props according to the mapping table above
5. **Icons**: Replace `ListIcon` with `List.Indicator`

## Breaking Changes

- `OrderedList` and `UnorderedList` are no longer separate components
- `spacing` prop renamed to `gap`
- `styleType` prop renamed to `listStyleType`
- `stylePosition` prop renamed to `listStylePosition`
- All List subcomponents now use namespace imports (e.g., `List.Item` instead of
  `ListItem`)

## Benefits

The v3 List component provides:

- **Consistent API**: All components use namespace imports
- **Better TypeScript support**: Improved type inference
- **Simplified imports**: Single import for all List-related components
- **CSS-aligned props**: Props match standard CSS property names
- **Reduced bundle size**: Tree-shakeable namespace exports
