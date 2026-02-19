---
title: Combobox
description:
  A versatile input component that combines a text input with a listbox,
  allowing users to filter a list of options and select single or multiple
  values.
links:
  source: components/combobox
  storybook: components-combobox--basic
  recipe: combobox
  ark: https://ark-ui.com/docs/components/combobox
---

<ExampleTabs name="combobox-basic" />

## Usage

```tsx
import { Combobox } from "@chakra-ui/react"
```

```tsx
<Combobox.Root>
  <Combobox.Label />

  <Combobox.Control>
    <Combobox.Input />
    <Combobox.IndicatorGroup>
      <Combobox.ClearTrigger />
      <Combobox.Trigger />
    </Combobox.IndicatorGroup>
  </Combobox.Control>

  <Combobox.Positioner>
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.Item />

      <Combobox.ItemGroup>
        <Combobox.ItemGroupLabel />
        <Combobox.Item />
      </Combobox.ItemGroup>
    </Combobox.Content>
  </Combobox.Positioner>
</Combobox.Root>
```

To setup combobox, you need to import the following hooks:

- `useListCollection`: Used to manage the
  [list collection](https://ark-ui.com/docs/collections/list-collection) in the
  combobox, providing helpful methods for filtering and mutating the list.

- `useFilter`: Used to provide the filtering logic for the combobox based on
  [`Intl.Collator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
  APIs.

## Examples

### Basic

The basic combobox provides a searchable dropdown with single selection.

<ExampleTabs name="combobox-basic" />

### Sizes

Pass the `size` prop to the `Combobox.Root` to change the size of the combobox.

<ExampleTabs name="combobox-with-sizes" />

### Variants

Pass the `variant` prop to the `Combobox.Root` to change the appearance of the
combobox.

<ExampleTabs name="combobox-with-variants" />

### Multiple

Pass the `multiple` prop to the `Combobox.Root` to enable multiple selection.
This allows users to select multiple items from the list.

> When this is set, the combobox will always clear the input value when an item
> is selected.

<ExampleTabs name="combobox-with-multiple" />

### Async Loading

Here's an example of loading the `collection` asynchronously as users type,
perfect for API-driven search interfaces.

<ExampleTabs name="combobox-with-async-content" />

### Highlight Matching Text

Here's an example of composing the `Combobox.Item` and `Highlight` components to
highlight matching text in search results.

<ExampleTabs name="combobox-with-highlight" />

### Open on Click

Use the `openOnClick` prop to open the combobox when the user clicks on the
input.

<ExampleTabs name="combobox-open-on-click" />

### Custom Objects

By default, the combobox collection expects an array of objects with `label` and
`value` properties. In some cases, you may need to deal with custom objects.

Use the `itemToString` and `itemToValue` props to map the custom object to the
required interface.

```tsx
const items = [
  { country: "United States", code: "US", flag: "🇺🇸" },
  { country: "Canada", code: "CA", flag: "🇨🇦" },
  { country: "Australia", code: "AU", flag: "🇦🇺" },
  // ...
]

const { contains } = useFilter({ sensitivity: "base" })

const { collection } = useListCollection({
  initialItems: items,
  itemToString: (item) => item.country,
  itemToValue: (item) => item.code,
  filter: contains,
})
```

<ExampleTabs name="combobox-with-custom-object" />

### Minimum Characters

Use the `openOnChange` prop to set a minimum number of characters before
filtering the list.

```tsx
<Combobox.Root openOnChange={(e) => e.inputValue.length > 2} />
```

<ExampleTabs name="combobox-min-character" />

### Field

Compose the `Combobox` component with the `Field` component to wrap the combobox
in a form field. Useful for form layouts.

<ExampleTabs name="combobox-with-field" />

### Form + Custom Object

When working with custom objects in forms, you often need to submit the
programmatic value rather than the display value. This example shows how to
combine custom object mapping with form submission using a hidden input.

The key is using `itemToValue` to define what gets submitted, while
`itemToString` controls what users see. A hidden input captures the programmatic
value for form submission.

> In this example, users see "🇺🇸 United States" but the form submits "US".

<ExampleTabs name="combobox-with-form-submit" />

### Hook Form

This example demonstrates how to integrate the Combobox with React Hook Form
using the `Controller` component. The form automatically receives the item's
`value` property without needing a hidden input.

Users see "React" but the form receives "react".

<ExampleTabs name="combobox-with-hook-form" />

### Disabled State

Pass the `disabled` prop to the `Combobox.Root` to disable the entire combobox.

<ExampleTabs name="combobox-with-disabled" />

### Disabled Item

Disable specific items in the dropdown, add the `disabled` prop to the
collection item.

```tsx {2}
const items = [
  { label: "Item 1", value: "item-1", disabled: true },
  { label: "Item 2", value: "item-2" },
]

const { collection } = useListCollection({
  initialItems: items,
  // ...
})
```

<ExampleTabs name="combobox-with-disabled-item" />

### Input Group

Combine with InputGroup to add icons or other elements.

<ExampleTabs name="combobox-with-input-group" />

### Invalid

Pass the `invalid` prop to the `Combobox.Root` to show the error state.

<ExampleTabs name="combobox-with-invalid" />

### Controlled Value

Use the `value` and `onValueChange` props to control the combobox's value
programmatically.

<ExampleTabs name="combobox-controlled" />

### Store

An alternative way to control the combobox is to use the `Combobox.RootProvider`
component and the `useCombobox` store hook.

```tsx
import { Combobox, useCombobox } from "@chakra-ui/react"

function Demo() {
  const combobox = useCombobox()

  return (
    <Combobox.RootProvider value={combobox}>{/* ... */}</Combobox.RootProvider>
  )
}
```

This way you can access the combobox state and methods from outside the
combobox.

<ExampleTabs name="combobox-with-store" />

### Controlled Open

Use the `open` and `onOpenChange` props to control the combobox's open state
programmatically.

<ExampleTabs name="combobox-open-controlled" />

### Limit Large Datasets

The recommended way of managing large lists is to use the `limit` property on
the `useListCollection` hook. This will limit the number of rendered items in
the DOM to improve performance.

<ExampleTabs name="combobox-with-limit" />

### Virtualization

Alternatively, you can leverage virtualization from the
`@tanstack/react-virtual` package to render large datasets efficiently.

<ExampleTabs name="combobox-virtualized" />

### Links

Use the `asChild` prop to render the combobox items as links.

<ExampleTabs name="combobox-with-links" />

For custom router links, you can customize the `navigate` prop on the
`Combobox.Root` component.

Here's an example of using the Tanstack Router.

```tsx {8-10}
import { Combobox } from "@chakra-ui/react"
import { useNavigate } from "@tanstack/react-router"

function Demo() {
  const navigate = useNavigate()
  return (
    <Combobox.Root
      navigate={({ href }) => {
        navigate({ to: href })
      }}
    >
      {/* ... */}
    </Combobox.Root>
  )
}
```

### Rehydrate Value

In some cases, where a combobox has a `defaultValue` but the collection is not
loaded yet, here's an example of how to rehydrate the value and populate the
input value.

<ExampleTabs name="combobox-rehydrate-value" />

### Custom Item

Customize the appearance of items in the dropdown with your own components.

<ExampleTabs name="combobox-with-custom-item" />

### Custom Filter

Here's an example of a custom filter that matches multiple properties of an
item.

<ExampleTabs name="combobox-with-custom-filter" />

### Custom Animation

To customize the animation of the combobox, pass the `_open` and `_closed` prop
to the `Combobox.Content` component.

<ExampleTabs name="combobox-with-custom-animation" />

### Open From Dialog

To use the combobox within a dialog or popover component, avoid wrapping the
`Combobox.Positioner` within the `Portal`.

```diff
-<Portal>
  <Combobox.Positioner>
    <Combobox.Content>
      {/* ... */}
    </Combobox.Content>
  </Combobox.Positioner>
-</Portal>
```

If you use a `Dialog` and have set `scrollBehavior="inside"`, you need to:

- Set the combobox positioning to `fixed` to avoid the combobox from being
  clipped by the dialog.
- Set `hideWhenDetached` to `true` to hide the combobox when the trigger is
  scrolled out of view.

```tsx
<Combobox.Root positioning={{ strategy: "fixed", hideWhenDetached: true }}>
  {/* ... */}
</Combobox.Root>
```

<ExampleTabs name="combobox-open-from-popover" />

### Creatable

Here's an example of how to allow users to create new options by typing values
that don't exist in the list. It uses the `useCombobox` and
`Combobox.RootProvider` components for smoother integration and management.

> **Note:** This example is not fully tested. Feel free to use it as a starting
> point and improve it according to your needs.

<ExampleTabs name="combobox-with-createable" />

## Guides

### Controlling the value

Use `value` and `onValueChange` for controlled mode. When changing the value
externally (e.g. form reset, sync) with filtering enabled, the input can show
empty if the selected item is filtered out. Call `reset()` before updating:

```tsx
const { collection, filter, reset } = useListCollection({
  initialItems: items,
  filter: contains,
})

// When changing value externally, reset the filter first
const setValueWithReset = (v: string[]) => {
  reset()
  setValue(v)
}
```

## Props

### Root

<PropTable component="Combobox" part="Root" />

### Item

<PropTable component="Combobox" part="Item" />

## Explorer

Explore the `Combobox` component parts interactively. Click on parts in the
sidebar to highlight them in the preview.

<Explorer name="combobox-explorer-demo" />
