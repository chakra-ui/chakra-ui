# v3 Migration Guide

## Changed

### Removed Components

- Removed `ControlBox` component

### Root component and types

All root components and their respective types are now suffixed with `<X>.Root`
or `<X>Root`

- `Accordion` -> `Accordion.Root`
- `AccordionProps` -> `AccordionRootProps`
- `Checkbox` -> `Checkbox.Root`
- `CheckboxProps` -> `CheckboxRootProps`
- and so on...

### Avatar

Before:

```tsx
<Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
```

After:

```tsx
<Avatar.Root name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
  <Avatar.Image />
  <Avatar.Fallback />
</Avatar.Root>
```

### Breadcrumb

Before:

```tsx
<Breadcrumb spacing="4">
  <BreadcrumbItem>
    <BreadcrumbLink as={Link} to="/home" replace>
      Breadcrumb 1
    </BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
```

After:

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List spacing="4">
    <Breadcrumb.Item>
      <Breadcrumb.Link asChild>
        <Link to="/home" replace>
          Breadcrumb 1
        </Link>
      </Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

- Move `spacing` and `separator` props to `Breadcrumb.List`
- `listProps` has been removed. Pass props directly to `Breadcrumb.List`

### Checkbox

Before:

```tsx
<Checkbox defaultChecked>My Checkbox</Checkbox>
```

After:

```tsx
<Checkbox.Root defaultChecked>
  <Checkbox.Control />
  <Checkbox.Label>My Checkbox</Checkbox.Label>
</Checkbox.Root>
```

### Progress

Before:

```tsx
<Progress value={50} />
```

After:

```tsx
<Progress.Root value={50}>
  <Progress.Track>
    <Progress.FilledTrack />
  </Progress.Track>
</Progress.Root>
```

- `ProgressLabel` is now assigned to `Progress.ValueText`. This means the theme
  key for the label is now `valueText`

- `ProgressLabel` should now be used to provide a label for the progress bar

### Circular Progress

Before:

```tsx
<CircularProgress value={50} />
```

After:

```tsx
<CircularProgress.Root value={50}>
  <CircularProgress.Circle>
    <CircularProgress.Track />
    <CircularProgress.FilledTrack />
  </CircularProgress.Circle>
</CircularProgress.Root>
```

- `CircularProgressLabel` is now assigned to `CircularProgress.ValueText`

- `CircularProgressLabel` should now be used to provide a label for the progress
  bar

### Tag

- `TagLeftIcon` and `TagRightIcon` are now assigned to `Tag.StartIcon` and
  `Tag.EndIcon` respectively

## Added

### `For` component

The `For` component is a new component that allows you to render a list of items
using a render prop.

```tsx
import { For } from "@chakra-ui/react"

const Demo = () => {
  return (
    <For each={[1, 2, 3]} fallback={<div>No items</div>}>
      {(item) => <div key={item}>{item}</div>}
    </For>
  )
}
```

### Namespace components

You can import components by leveraging the dot notation.

```tsx
import { Accordion } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Button>Click me</Accordion.Button>
        <Accordion.Panel>Panel content</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

### `asChild` prop

Removed support for `as` prop due to the type complexity involved.

**Action:** Replace `asChild` in `chakra` factory and existing components.

```tsx
import { Button } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Button asChild>
      <a href="#">Child</a>
    </Button>
  )
}
```
