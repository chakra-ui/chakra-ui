# IconButton Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 IconButton component to the v3
API.

## Overview

In v3, the IconButton component API has been updated for better consistency with
React patterns. The codemod automatically handles these transformations.

## Key Changes

1. **`icon` prop removed**: Icons are now passed as direct children
2. **`isRounded` → `borderRadius="full"`**: Updated prop name for clarity

## Transformation Examples

### Icon Prop to Children

The `icon` prop has been removed. Icons are now passed as direct children.

**v2:**

```tsx
import { SearchIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

;<IconButton icon={<SearchIcon />} aria-label="Search" />
```

**v3:**

```tsx
import { SearchIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

;<IconButton aria-label="Search">
  <SearchIcon />
</IconButton>
```

### Icon with Variable

Variables work the same way, just passed as children:

**v2:**

```tsx
function MyButton({ icon }) {
  return <IconButton icon={icon} aria-label="Action" />
}
```

**v3:**

```tsx
function MyButton({ icon }) {
  return <IconButton aria-label="Action">{icon}</IconButton>
}
```

### isRounded Transformation

The `isRounded` prop is renamed to `borderRadius="full"`:

**v2:**

```tsx
;<IconButton icon={<SearchIcon />} isRounded aria-label="Search" />
```

**v3:**

```tsx
;<IconButton borderRadius="full" aria-label="Search">
  <SearchIcon />
</IconButton>
```

### Combined Transformation

Both transformations work together:

**v2:**

```tsx
;<IconButton
  icon={<CloseIcon />}
  isRounded
  aria-label="Close"
  colorScheme="red"
  size="lg"
/>
```

**v3:**

```tsx
;<IconButton borderRadius="full" aria-label="Close" colorScheme="red" size="lg">
  <CloseIcon />
</IconButton>
```

## Complete Example

### Before (v2)

```tsx
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons"
import { HStack, IconButton } from "@chakra-ui/react"

function Toolbar() {
  return (
    <HStack spacing={4}>
      <IconButton
        icon={<AddIcon />}
        aria-label="Add"
        colorScheme="green"
        isRounded
      />

      <IconButton
        icon={<EditIcon />}
        aria-label="Edit"
        colorScheme="blue"
        size="lg"
      />

      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete"
        colorScheme="red"
        variant="outline"
      />

      <IconButton
        icon={<SearchIcon />}
        aria-label="Search"
        isRounded
        size="sm"
      />
    </HStack>
  )
}
```

### After (v3)

```tsx
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons"
import { HStack, IconButton } from "@chakra-ui/react"

function Toolbar() {
  return (
    <HStack spacing={4}>
      <IconButton aria-label="Add" colorScheme="green" borderRadius="full">
        <AddIcon />
      </IconButton>

      <IconButton aria-label="Edit" colorScheme="blue" size="lg">
        <EditIcon />
      </IconButton>

      <IconButton aria-label="Delete" colorScheme="red" variant="outline">
        <DeleteIcon />
      </IconButton>

      <IconButton aria-label="Search" borderRadius="full" size="sm">
        <SearchIcon />
      </IconButton>
    </HStack>
  )
}
```

## With React Icons (v3)

If you're also migrating from `@chakra-ui/icons` to `react-icons`:

**v2:**

```tsx
import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

function SearchBar() {
  return (
    <>
      <IconButton icon={<SearchIcon />} aria-label="Search" />
      <IconButton icon={<CloseIcon />} aria-label="Clear" isRounded />
    </>
  )
}
```

**v3:**

```tsx
import { IconButton } from "@chakra-ui/react"
import { LuSearch, LuX } from "react-icons/lu"

function SearchBar() {
  return (
    <>
      <IconButton aria-label="Search">
        <LuSearch />
      </IconButton>
      <IconButton aria-label="Clear" borderRadius="full">
        <LuX />
      </IconButton>
    </>
  )
}
```

## Dynamic Icons

When using dynamic icons, pass them as children:

**v2:**

```tsx
function DynamicIconButton({ iconName, ...props }) {
  const iconMap = {
    search: <SearchIcon />,
    edit: <EditIcon />,
    delete: <DeleteIcon />,
  }

  return <IconButton icon={iconMap[iconName]} {...props} />
}
```

**v3:**

```tsx
function DynamicIconButton({ iconName, ...props }) {
  const iconMap = {
    search: <LuSearch />,
    edit: <LuPencil />,
    delete: <LuTrash2 />,
  }

  return <IconButton {...props}>{iconMap[iconName]}</IconButton>
}
```

## Props Preserved

All other IconButton props are preserved:

| Prop            | v2  | v3  | Notes                  |
| --------------- | --- | --- | ---------------------- |
| `aria-label`    | ✅  | ✅  | Required prop          |
| `colorScheme`   | ✅  | ✅  | Unchanged              |
| `size`          | ✅  | ✅  | Unchanged              |
| `variant`       | ✅  | ✅  | Unchanged              |
| `isDisabled`    | ✅  | ✅  | Unchanged              |
| `isLoading`     | ✅  | ✅  | Unchanged              |
| `icon`          | ✅  | ❌  | → children             |
| `isRounded`     | ✅  | ❌  | → borderRadius="full"  |
| `borderRadius`  | ✅  | ✅  | Use instead of rounded |
| All other props | ✅  | ✅  | Unchanged              |

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform icon-button src/**/*.tsx
```

## Manual Review Required

After running the codemod, review:

1. **Icon size**: If you were relying on the icon prop to size icons
   automatically, you may need to adjust icon sizes manually:

   ```tsx
   // May need size adjustment
   <IconButton aria-label="Search">
     <LuSearch size={20} /> {/* Adjust size as needed */}
   </IconButton>
   ```

2. **Custom icon components**: If you have custom icon components that expect
   specific props, ensure they work as children:

   ```tsx
   // Custom icon wrapper
   function CustomIcon({ name, ...props }) {
     return <Icon as={iconMap[name]} {...props} />
   }

   // Usage in IconButton
   ;<IconButton aria-label="Action">
     <CustomIcon name="search" />
   </IconButton>
   ```

3. **Conditional icons**: If you're using conditional rendering for icons,
   ensure the logic still works:

   ```tsx
   <IconButton aria-label="Toggle">
     {isOpen ? <LuChevronUp /> : <LuChevronDown />}
   </IconButton>
   ```

4. **Existing children**: If an IconButton had existing children (unusual but
   possible), they will be replaced by the icon. Review these cases manually.

## Combining with Icons Migration

If you're also migrating from `@chakra-ui/icons` to `react-icons/lu`, run both
codemods:

```bash
# 1. Transform icons from @chakra-ui/icons
npx @chakra-ui/codemod@latest --transform icons src/**/*.tsx

# 2. Transform IconButton component
npx @chakra-ui/codemod@latest --transform icon-button src/**/*.tsx
```

**Note**: The order matters less, but running `icons` first ensures your icon
imports are correct before transforming the IconButton component.

## Troubleshooting

### Icons not rendering

**Problem**: Icons don't show up after migration.

**Solution**: Ensure icons are imported correctly:

```tsx
// ✅ Correct - import the icon
import { LuSearch } from "react-icons/lu"
<IconButton aria-label="Search">
  <LuSearch />
</IconButton>

// ❌ Wrong - icon not imported
<IconButton aria-label="Search">
  <SearchIcon /> {/* Not imported */}
</IconButton>
```

### Multiple children warning

**Problem**: React warns about multiple children in IconButton.

**Solution**: IconButton should have only one child (the icon):

```tsx
// ❌ Wrong - multiple children
<IconButton aria-label="Search">
  <LuSearch />
  Search
</IconButton>

// ✅ Correct - single icon child
<IconButton aria-label="Search">
  <LuSearch />
</IconButton>
```

### TypeScript errors

**Problem**: TypeScript complains about children prop.

**Solution**: Ensure you're using the latest `@chakra-ui/react` types. The v3
IconButton types accept children.

## Additional Resources

- [IconButton Documentation](https://chakra-ui.com/docs/components/icon-button)
- [Icons Migration Guide](./ICONS_MIGRATION.md)
- [Button Migration Guide](./BUTTON_MIGRATION.md)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
