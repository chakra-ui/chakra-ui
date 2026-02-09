# Tabs Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 Tabs components to the v3
compound component API.

## Overview

In v3, Tabs has been redesigned with a compound component pattern that provides
better composition and clearer component relationships. The codemod
automatically handles most transformations.

## Component Mapping

| v2 Component | v3 Component     |
| ------------ | ---------------- |
| `<Tabs>`     | `<Tabs.Root>`    |
| `<TabList>`  | `<Tabs.List>`    |
| `<Tab>`      | `<Tabs.Trigger>` |
| `<TabPanel>` | `<Tabs.Content>` |

**Note**: `TabPanels` wrapper is removed in v3. Content panels are placed
directly as children of `Tabs.Root`.

## Transformation Examples

### Basic Tabs

**v2:**

```tsx
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

;<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

**v3:**

```tsx
import { Tabs } from "@chakra-ui/react"

;<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="tab-0">One</Tabs.Trigger>
    <Tabs.Trigger value="tab-1">Two</Tabs.Trigger>
    <Tabs.Trigger value="tab-2">Three</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="tab-0">
    <p>one!</p>
  </Tabs.Content>
  <Tabs.Content value="tab-1">
    <p>two!</p>
  </Tabs.Content>
  <Tabs.Content value="tab-2">
    <p>three!</p>
  </Tabs.Content>
</Tabs.Root>
```

### With Variant

**v2:**

```tsx
;<Tabs variant="enclosed">
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
```

**v3:**

```tsx
;<Tabs.Root variant="enclosed">
  <Tabs.List>
    <Tabs.Trigger value="tab-0">One</Tabs.Trigger>
    <Tabs.Trigger value="tab-1">Two</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="tab-0">
    <p>one!</p>
  </Tabs.Content>
  <Tabs.Content value="tab-1">
    <p>two!</p>
  </Tabs.Content>
</Tabs.Root>
```

## Prop Transformations

### Tabs.Root Props

| v2 Prop        | v3 Prop                | Notes                                             |
| -------------- | ---------------------- | ------------------------------------------------- |
| `index`        | `value`                | Now uses tab value instead of index               |
| `defaultIndex` | `defaultValue`         | Now uses tab value instead of index               |
| `onChange`     | `onValueChange`        | Callback signature changed to `({ value }) => {}` |
| `isManual`     | `activationMode`       | If true, becomes `activationMode="manual"`        |
| `isLazy`       | `lazyMount`            | Direct rename                                     |
| `lazyBehavior` | `unmountOnExit`        | If `"unmount"`, adds `unmountOnExit` prop         |
| `isFitted`     | `fitted`               | Direct rename                                     |
| `align`        | `justifyContent`       | Remapped values (see below)                       |
| `variant`      | `variant` / `unstyled` | Variant mapping (see below)                       |
| `size`         | `size`                 | Unchanged                                         |
| `orientation`  | `orientation`          | Unchanged                                         |
| `colorScheme`  | `colorScheme`          | Unchanged                                         |

### Tab Value System

In v3, each tab must have a unique `value` prop. The codemod automatically
assigns values like `"tab-0"`, `"tab-1"`, etc., based on the tab's position.

**v2:**

```tsx
// Tabs are identified by index
<Tabs index={1} onChange={(index) => console.log(index)}>
```

**v3:**

```tsx
// Tabs are identified by value
<Tabs.Root
  value="tab-1"
  onValueChange={({ value }) => console.log(value)}
>
```

### align Prop Mapping

| v2 Value | v3 Value     |
| -------- | ------------ |
| `start`  | `flex-start` |
| `end`    | `flex-end`   |
| `center` | `center`     |

**v2:**

```tsx
;<Tabs align="end" variant="enclosed">
  {/* ... */}
</Tabs>
```

**v3:**

```tsx
;<Tabs.Root justifyContent="flex-end" variant="enclosed">
  {/* ... */}
</Tabs.Root>
```

### variant Prop Mapping

| v2 Variant         | v3 Variant / Prop |
| ------------------ | ----------------- |
| `line`             | `line`            |
| `enclosed`         | `enclosed`        |
| `enclosed-colored` | `enclosed`        |
| `soft-rounded`     | `subtle`          |
| `solid-rounded`    | `outline`         |
| `unstyled`         | `unstyled` prop   |

**v2:**

```tsx
// Old variant values
<Tabs variant="soft-rounded">...</Tabs>
<Tabs variant="enclosed-colored">...</Tabs>
<Tabs variant="unstyled">...</Tabs>
```

**v3:**

```tsx
// New variant values
<Tabs.Root variant="subtle">...</Tabs.Root>
<Tabs.Root variant="enclosed">...</Tabs.Root>
<Tabs.Root unstyled>...</Tabs.Root>
```

## Complete Example

### Before (v2)

```tsx
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

function TabsExample() {
  const handleTabsChange = (index) => {
    console.log("Tab changed to:", index)
  }

  return (
    <Tabs
      defaultIndex={0}
      onChange={handleTabsChange}
      variant="enclosed"
      size="lg"
      isFitted
      isLazy
    >
      <TabList>
        <Tab>Account</Tab>
        <Tab>Settings</Tab>
        <Tab>Billing</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Manage your account</p>
        </TabPanel>
        <TabPanel>
          <p>Configure settings</p>
        </TabPanel>
        <TabPanel>
          <p>View billing info</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
```

### After (v3)

```tsx
import { Tabs } from "@chakra-ui/react"

function TabsExample() {
  const handleTabsChange = ({ value }) => {
    console.log("Tab changed to:", value)
  }

  return (
    <Tabs.Root
      defaultValue="tab-0"
      onValueChange={handleTabsChange}
      variant="enclosed"
      size="lg"
      fitted
      lazyMount
    >
      <Tabs.List>
        <Tabs.Trigger value="tab-0">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab-1">Settings</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Billing</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="tab-0">
        <p>Manage your account</p>
      </Tabs.Content>
      <Tabs.Content value="tab-1">
        <p>Configure settings</p>
      </Tabs.Content>
      <Tabs.Content value="tab-2">
        <p>View billing info</p>
      </Tabs.Content>
    </Tabs.Root>
  )
}
```

## Import Changes

The codemod automatically consolidates Tabs imports:

**v2:**

```tsx
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Tabs } from "@chakra-ui/react"
```

## Lazy Loading

### isLazy

**v2:**

```tsx
;<Tabs isLazy>{/* Content is lazy loaded but kept mounted */}</Tabs>
```

**v3:**

```tsx
;<Tabs.Root lazyMount>
  {/* Content is lazy loaded but kept mounted */}
</Tabs.Root>
```

### lazyBehavior="unmount"

**v2:**

```tsx
;<Tabs isLazy lazyBehavior="unmount">
  {/* Content is unmounted when inactive */}
</Tabs>
```

**v3:**

```tsx
;<Tabs.Root lazyMount unmountOnExit>
  {/* Content is unmounted when inactive */}
</Tabs.Root>
```

## Manual Activation

**v2:**

```tsx
;<Tabs isManual>{/* Tabs require Enter or Space to activate */}</Tabs>
```

**v3:**

```tsx
;<Tabs.Root activationMode="manual">
  {/* Tabs require Enter or Space to activate */}
</Tabs.Root>
```

## Fitted Tabs

**v2:**

```tsx
;<Tabs isFitted>{/* Tabs take full width */}</Tabs>
```

**v3:**

```tsx
;<Tabs.Root fitted>{/* Tabs take full width */}</Tabs.Root>
```

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform tabs src/**/*.tsx
```

## Manual Review Required

After running the codemod, review:

1. **Tab values**: The codemod generates automatic values (`tab-0`, `tab-1`,
   etc.). Consider using semantic values:

   ```tsx
   // Generated
   <Tabs.Trigger value="tab-0">Account</Tabs.Trigger>

   // Better - semantic values
   <Tabs.Trigger value="account">Account</Tabs.Trigger>
   ```

2. **Controlled tabs**: If using `index`/`value`, update to use tab values
   instead of indices:

   ```tsx
   // v2
   const [tabIndex, setTabIndex] = useState(0)
   <Tabs index={tabIndex} onChange={setTabIndex}>

   // v3
   const [tabValue, setTabValue] = useState("tab-0")
   <Tabs.Root value={tabValue} onValueChange={({ value }) => setTabValue(value)}>
   ```

3. **onChange callbacks**: Update callback signatures to destructure `value`:

   ```tsx
   // v2
   const handleChange = (index) => {
     console.log("Tab index:", index)
   }

   // v3
   const handleChange = ({ value }) => {
     console.log("Tab value:", value)
   }
   ```

4. **Dynamic tabs**: If tabs are rendered dynamically, ensure each has a unique
   `value` prop:

   ```tsx
   {
     tabs.map((tab, i) => (
       <Tabs.Trigger key={tab.id} value={tab.id}>
         {tab.label}
       </Tabs.Trigger>
     ))
   }
   ```

5. **Variant changes**: Review transformed variants for visual consistency:
   - `soft-rounded` → `subtle`
   - `solid-rounded` → `outline`
   - `enclosed-colored` → `enclosed`

## Troubleshooting

### Tabs don't activate on click

**Problem**: Tabs require keyboard activation after migration.

**Solution**: Remove `activationMode="manual"` or ensure it's intentional:

```tsx
// If you want click activation (default)
<Tabs.Root>

// If you want manual activation (keyboard only)
<Tabs.Root activationMode="manual">
```

### Tab content not showing

**Problem**: Tab content doesn't appear when clicking tabs.

**Solution**: Ensure `Tabs.Trigger` and `Tabs.Content` have matching `value`
props:

```tsx
// ✅ Correct - matching values
<Tabs.Trigger value="account">Account</Tabs.Trigger>
<Tabs.Content value="account">Content</Tabs.Content>

// ❌ Wrong - mismatched values
<Tabs.Trigger value="account">Account</Tabs.Trigger>
<Tabs.Content value="tab-0">Content</Tabs.Content>
```

### TypeScript errors about value prop

**Problem**: TypeScript complains about missing `value` prop.

**Solution**: In v3, `value` is required on both `Tabs.Trigger` and
`Tabs.Content`. Ensure all tabs have unique values.

### Controlled tabs not working

**Problem**: Controlled tabs don't update properly.

**Solution**: Update state to use tab values instead of indices:

```tsx
// v2 - uses index
const [tabIndex, setTabIndex] = useState(0)

// v3 - uses value
const [tabValue, setTabValue] = useState("tab-0")
```

## Additional Resources

- [Tabs Documentation](https://chakra-ui.com/docs/components/tabs)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
- [Compound Components Pattern](https://chakra-ui.com/docs/get-started/compound-components)
