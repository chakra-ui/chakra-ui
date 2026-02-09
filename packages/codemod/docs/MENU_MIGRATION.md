# Menu Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 Menu components to the v3
compound component API.

## Overview

In v3, Menu has been redesigned with a compound component pattern that provides
better composition and clearer component relationships. The codemod
automatically handles most transformations.

## Component Mapping

| v2 Component                   | v3 Component                                                   |
| ------------------------------ | -------------------------------------------------------------- |
| `<Menu>`                       | `<Menu.Root>`                                                  |
| `<MenuButton>`                 | `<Menu.Trigger>` (or with `as` prop: `<Menu.Trigger asChild>`) |
| `<MenuList>`                   | `<Portal>` + `<Menu.Positioner>` + `<Menu.Content>`            |
| `<MenuItem>`                   | `<Menu.Item>`                                                  |
| `<MenuGroup>`                  | `<Menu.ItemGroup>` + `<Menu.ItemGroupLabel>`                   |
| `<MenuDivider>`                | `<Menu.Separator>`                                             |
| `<MenuOptionGroup>` (radio)    | `<Menu.RadioItemGroup>` + `<Menu.RadioItem>`                   |
| `<MenuOptionGroup>` (checkbox) | `<Menu.ItemGroup>` + `<Menu.CheckboxItem>`                     |

## Transformation Examples

### Basic Menu (without `as` prop)

**v2:**

```tsx
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

;<Menu>
  <MenuButton>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Delete</MenuItem>
  </MenuList>
</Menu>
```

**v3:**

```tsx
import { Menu, Portal } from "@chakra-ui/react"

;<Menu.Root>
  <Menu.Trigger>Actions</Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="item-0">Download</Menu.Item>
        <Menu.Item value="item-1">Create a Copy</Menu.Item>
        <Menu.Item value="item-2">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

**Note:** When MenuButton has no `as` prop, it directly becomes
`<Menu.Trigger>`.

### MenuButton with `as` prop

**v2:**

```tsx
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

;<Menu>
  <MenuButton as={Button}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
  </MenuList>
</Menu>
```

**v3:**

```tsx
import { Button, Menu, Portal } from "@chakra-ui/react"

;<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="item-0">Download</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

**Note:** When MenuButton has an `as` prop, it becomes `<Menu.Trigger asChild>`
wrapping the component specified in `as`.

### MenuButton with Icons

**v2:**

```tsx
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

;<Menu>
  <MenuButton rightIcon={<ChevronDownIcon />}>Actions</MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
  </MenuList>
</Menu>
```

**v3:**

```tsx
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, Portal } from "@chakra-ui/react"

;<Menu.Root>
  <Menu.Trigger asChild>
    <Button>
      Actions
      <ChevronDownIcon />
    </Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="item-0">Download</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

### MenuGroup with Title

**v2:**

```tsx
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"

;<Menu>
  <MenuButton>Profile</MenuButton>
  <MenuList>
    <MenuGroup title="Profile">
      <MenuItem>My Account</MenuItem>
      <MenuItem>Payments</MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title="Help">
      <MenuItem>Docs</MenuItem>
      <MenuItem>FAQ</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
```

**v3:**

```tsx
import { Menu, Portal } from "@chakra-ui/react"

;<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Profile</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>Profile</Menu.ItemGroupLabel>
          <Menu.Item value="item-0">My Account</Menu.Item>
          <Menu.Item value="item-1">Payments</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Separator />
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>Help</Menu.ItemGroupLabel>
          <Menu.Item value="item-2">Docs</Menu.Item>
          <Menu.Item value="item-3">FAQ</Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

## Prop Transformations

### Menu.Root Props

| v2 Prop         | v3 Prop                       | Notes                           |
| --------------- | ----------------------------- | ------------------------------- |
| `isLazy`        | `lazyMount` + `unmountOnExit` | Splits into two props           |
| `placement`     | `positioning.placement`       | Grouped into positioning object |
| `gutter`        | `positioning.gutter`          | Grouped into positioning object |
| `offset`        | `positioning.offset`          | Grouped into positioning object |
| `flip`          | `positioning.flip`            | Grouped into positioning object |
| `strategy`      | `positioning.strategy`        | Grouped into positioning object |
| `boundary`      | `positioning.boundary`        | Wrapped in arrow function       |
| `closeOnSelect` | `closeOnSelect`               | Unchanged                       |
| `closeOnBlur`   | `closeOnInteractOutside`      | Direct rename                   |

### MenuItem Props

| v2 Prop   | v3 Prop    | Notes                                          |
| --------- | ---------- | ---------------------------------------------- |
| `onClick` | `onSelect` | Renamed                                        |
| N/A       | `value`    | **Required** in v3 - auto-generated by codemod |

**v2:**

```tsx
<MenuItem onClick={() => console.log("Download")}>Download</MenuItem>
```

**v3:**

```tsx
<Menu.Item value="item-0" onSelect={() => console.log("Download")}>
  Download
</Menu.Item>
```

### isLazy Transformation

**v2:**

```tsx
<Menu isLazy>{/* Content is lazy loaded and kept mounted */}</Menu>
```

**v3:**

```tsx
<Menu.Root lazyMount unmountOnExit>
  {/* Content is lazy loaded and unmounted when closed */}
</Menu.Root>
```

### Positioning Props

All positioning-related props are grouped into a single `positioning` object:

**v2:**

```tsx
<Menu placement="right-end" gutter={8} offset={[0, 10]} flip={false}>
  {/* ... */}
</Menu>
```

**v3:**

```tsx
<Menu.Root
  positioning={{
    placement: "right-end",
    gutter: 8,
    offset: [0, 10],
    flip: false,
  }}
>
  {/* ... */}
</Menu.Root>
```

## MenuOptionGroup Splitting

In v3, `MenuOptionGroup` is split into type-specific patterns:

### Radio Groups

**v2:**

```tsx
<MenuOptionGroup defaultValue="asc" title="Order" type="radio">
  <MenuItemOption value="asc">Ascending</MenuItemOption>
  <MenuItemOption value="desc">Descending</MenuItemOption>
</MenuOptionGroup>
```

**v3:**

```tsx
<Menu.RadioItemGroup defaultValue="asc">
  <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
  <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
</Menu.RadioItemGroup>
```

**Note:** The `title` attribute is removed. The codemod preserves it on the
group, but you'll need to manually manage state with `value` and `onValueChange`
props.

### Checkbox Groups

**v2:**

```tsx
<MenuOptionGroup title="Notifications" type="checkbox">
  <MenuItemOption value="email">Email</MenuItemOption>
  <MenuItemOption value="phone">Phone</MenuItemOption>
</MenuOptionGroup>
```

**v3:**

```tsx
<Menu.ItemGroup>
  <Menu.CheckboxItem value="email">Email</Menu.CheckboxItem>
  <Menu.CheckboxItem value="phone">Phone</Menu.CheckboxItem>
</Menu.ItemGroup>
```

**Important:** Unlike radio groups, there is NO `Menu.CheckboxItemGroup` in v3.
Checkbox items use regular `Menu.ItemGroup`, and you'll need to manually add
state management using the `useCheckboxGroup` hook or custom state.

## Portal Requirement

In v3, `MenuList` is replaced with a Portal wrapper that contains the
positioning logic:

**Structure:**

```tsx
<Portal>
  <Menu.Positioner>
    <Menu.Content>{/* Menu items */}</Menu.Content>
  </Menu.Positioner>
</Portal>
```

The codemod automatically:

1. Wraps the content in Portal > Menu.Positioner > Menu.Content
2. Adds `Portal` to imports from `@chakra-ui/react`

## Complete Example

### Before (v2)

```tsx
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"

function MenuExample() {
  const handleDownload = () => console.log("Download")

  return (
    <Menu placement="right-end" isLazy>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleDownload}>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
```

### After (v3)

```tsx
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Menu, Portal } from "@chakra-ui/react"

function MenuExample() {
  const handleDownload = () => console.log("Download")

  return (
    <Menu.Root positioning={{ placement: "right-end" }} lazyMount unmountOnExit>
      <Menu.Trigger asChild>
        <Button>
          Actions
          <ChevronDownIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="item-0" onSelect={handleDownload}>
              Download
            </Menu.Item>
            <Menu.Item value="item-1">Create a Copy</Menu.Item>
            <Menu.Separator />
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>Help</Menu.ItemGroupLabel>
              <Menu.Item value="item-2">Docs</Menu.Item>
              <Menu.Item value="item-3">FAQ</Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
```

**Note:** Since the v2 example uses `as={Button}`, the v3 version uses
`<Menu.Trigger asChild><Button>...</Button></Menu.Trigger>`. If the v2 example
had just `<MenuButton>`, it would become `<Menu.Trigger>...</Menu.Trigger>`
without the Button wrapper.

## Import Changes

The codemod consolidates imports:

**v2:**

```tsx
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react"
```

**v3:**

```tsx
import { Menu, Portal } from "@chakra-ui/react"
```

**Note:** `Button` import is not added automatically - ensure it's imported if
using `as={Button}`.

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform menu src/**/*.tsx
```

## Manual Review Required

After running the codemod, review:

1. **Auto-generated value props**: Menu.Item gets `value="item-0"`,
   `value="item-1"`, etc. - consider using semantic values:

   ```tsx
   // Generated
   <Menu.Item value="item-0">Account</Menu.Item>

   // Better - semantic values
   <Menu.Item value="account">Account</Menu.Item>
   ```

2. **Button/Component imports**:
   - If MenuButton had NO `as` prop, it becomes `<Menu.Trigger>` directly - no
     additional imports needed
   - If MenuButton had `as={Button}` or `as={IconButton}`, ensure that component
     is imported:

   ```tsx
   import { Menu, Portal, Button } from '@chakra-ui/react'
   // or
   import { Menu, Portal, IconButton } from '@chakra-ui/react'
   ```

3. **MenuGroup title**: The `title` attribute is converted to
   `Menu.ItemGroupLabel` as the first child - verify text content.

4. **onClick callbacks**: Update to use `onSelect` and ensure correct
   signatures.

5. **Positioning props**: All positioning is grouped into `positioning` object
   on Menu.Root.

6. **MenuButton with `as` prop**: If using `as={IconButton}`, ensure
   `IconButton` is imported.

7. **Checkbox/Radio state management**: The codemod transforms the structure but
   does NOT add state management:
   - **Radio groups**: Need to add `value` and `onValueChange` props with
     `useState`
   - **Checkbox items**: Need to use `useCheckboxGroup` hook or custom state
     with `checked` and `onCheckedChange` props

   See examples in the v3 docs for proper state management patterns.

## Troubleshooting

### Menu items not clickable

**Problem**: Menu items don't respond to clicks.

**Solution**: Ensure `onSelect` is used instead of `onClick`:

```tsx
// ✅ Correct
<Menu.Item value="download" onSelect={() => console.log('Download')}>

// ❌ Wrong
<Menu.Item value="download" onClick={() => console.log('Download')}>
```

### Menu content not showing

**Problem**: Menu doesn't open when clicking the trigger.

**Solution**: Ensure the structure includes Portal > Menu.Positioner >
Menu.Content:

```tsx
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>{/* items */}</Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

### TypeScript errors about value prop

**Problem**: TypeScript complains about missing `value` prop on Menu.Item.

**Solution**: In v3, `value` is required on `Menu.Item`. The codemod
auto-generates values, but you may need to update them manually.

### Button not defined error

**Problem**: Runtime error that `Button` is not defined.

**Solution**: Add `Button` to your imports:

```tsx
import { Button, Menu, Portal } from "@chakra-ui/react"
```

### Positioning not working

**Problem**: Menu appears in wrong position after migration.

**Solution**: Check that positioning props are correctly grouped:

```tsx
// ✅ Correct
<Menu.Root positioning={{ placement: 'right-end', gutter: 8 }}>

// ❌ Wrong
<Menu.Root placement="right-end" gutter={8}>
```

## Additional Resources

- [Menu Documentation](https://chakra-ui.com/docs/components/menu)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
- [Compound Components Pattern](https://chakra-ui.com/docs/get-started/compound-components)
