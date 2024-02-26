# v3 Migration Guide

## Changed

### Theming

Renamed all `container` parts to `root`. Kindly update your theme to reflect

### Removed Components and Packages

- Removed `ControlBox` component
- Removed `@chakra-ui/icons` package. Prefer to use `lucide-react` or
  `react-icons` instead.

### Root component and types

All root components and their respective types are now suffixed with `<X>.Root`
or `<X>Root`

- `Accordion` -> `Accordion.Root`
- `AccordionProps` -> `AccordionRootProps`
- `Checkbox` -> `Checkbox.Root`
- `CheckboxProps` -> `CheckboxRootProps`
- and so on...

### Accordion

- Rename `allowMultiple` to `multiple`
- Rename `allowToggle` to `collapsible`
- Rename `AccordionButton` to `Accordion.Trigger`
- Rename `AccordionPanel` to `Accordion.Content`

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
  <Progress.ValueText />
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

- `TagLeftIcon` and `TagRightIcon` are removed in favor of rendering the icon
  directly inside the `Tag` component.

### Tooltip

- Move `portalProps` to `Tooltip.Positioner`

Before:

```tsx
<Tooltip label="Hey there" hasArrow>
  <Button>Hover me</Button>
</Tooltip>
```

After:

```tsx
<Tooltip.Root placement="bottom">
  <Tooltip.Trigger asChild>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>
      <Tooltip.Arrow />
      Hey there
    </Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

However, you can still get back to the legacy API by creating a custom
component.

```tsx
import { Tooltip } from "@chakra-ui/react"

export type CustomTooltipProps = Tooltip.RootProps & {
  label?: string
  hasArrow?: boolean
}

const CustomTooltip = (props: Props) => {
  const { label, children, hasArrow, ...localProps } = props
  const [rootProps, contentProps] = Tooltip.splitProps(localProps)

  return (
    <Tooltip.Root placement="bottom" {...rootProps}>
      <Tooltip.Trigger asChild>
        {isValidElement(children) ? children : <span>{children}</span>}
      </Tooltip.Trigger>
      <Tooltip.Content {...contentProps}>
        {hasArrow && <Tooltip.Arrow />}
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
```

- Remove `closeOnMouseDown`, use `closeOnPointerDown` instead
- Remove all `arrow*` props in favor of rendering the `Tooltip.Arrow` component

### FormControl -> Field

Form control has now been renamed to `Field` to better reflect its purpose as an
element that represents a form field.

```tsx
<Field.Root id="first-name" isRequired isInvalid>
  <Field.Label>First name</Field.Label>
  <Input placeholder="First Name" />
  <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
  <Field.ErrorMessage>Your First name is invalid</Field.ErrorMessage>
</Field.Root>
```

HelperText has been renamed to `Field.HelpText` for brevity.

### Select -> NativeSelect

The `Select` component has been renamed to `NativeSelect` to better reflect its
purpose as a native select element, and give room for a custom select component.

The API has also changed significantly to make it more modular.

Before:

```tsx
<Select color="red.400">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

After:

```tsx
<NativeSelect.Root>
  <NativeSelect.Field color="pink.500" placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </NativeSelect.Field>
  <NativeSelect.Icon />
</NativeSelect.Root>
```

### Modal -> Dialog

The `Modal` component has been renamed to `Dialog` to better reflect its purpose
as a dialog element.

Removed `containerProps` in favor of rendering the `Dialog.Positioner` component
to better control this element.

Before:

```tsx
<Modal>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody />
    <ModalFooter />
  </ModalContent>
</Modal>
```

After:

```tsx
<Dialog.Root>
  <Dialog.Overlay />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>Dialog Title</Dialog.Header>
      <Dialog.CloseTrigger />
      <Dialog.Body />
      <Dialog.Footer />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

### Alert Dialog

We've removed the `AlertDialog` component in favor of passing the
`role="alertdialog"` to the `Dialog` component.

### Popover

- `PopoverTrigger` now renders a `button` by default. Use the `asChild` to
  switch the trigger to a different element.

- `PopoverAnchor` now renders a `span` by default. Use the `asChild` to switch
  the anchor to a different element.

- Popover now requires the `Popover.Positioner` component to control the
  position of the popover.

- Removed `containerProps` in favor of rendering the `Popover.Positioner`
  component

Before:

```tsx
<Popover>
  <PopoverTrigger>
    <Button>Trigger</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Confirmation!</PopoverHeader>
    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
  </PopoverContent>
</Popover>
```

After:

```tsx
<Popover.Root>
  <Popover.Trigger asChild>
    <Button>Trigger</Button>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow />
      <Popover.CloseTrigger />
      <Popover.Header>Confirmation!</Popover.Header>
      <Popover.Body>
        <p>Are you sure you want to have that milkshake?</p>
        <br />
        <button>Yes</button>
        <button>No</button>
      </Popover.Body>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

### Button

The `Button` component has been simplified to remove internal complexity.

**isLoading**

Removed `isLoading` prop in favor of rendering `Spinner` component

Before:

```tsx
<Button isLoading colorScheme="blue">
  Click me
</Button>
```

After:

```tsx
<Button isDisabled colorScheme="blue">
  <Spinner boxSize="1em" />
  Click me
</Button>
```

**leftIcon and rightIcon**

Removed `leftIcon` and `rightIcon` in favor of rendering an icon component
inlined with the button content.

> To implement `iconSpacing`, you can use the `gap` prop on the `Button`
> component.

Before:

```tsx
<Button leftIcon={<AddIcon />}>Click me</Button>
```

After:

```tsx
<Button>
  <AddIcon />
  Click me
</Button>
```

Removed `loadingText` in favor of updating the button content directly.

Before:

```tsx
<Button isLoading loadingText="Submitting">
  Click me
</Button>
```

After:

```tsx
<Button isDisabled>
  <Spinner boxSize="1em" />
  Submitting
</Button>
```

### Table

Renamed all table components to better reflect their purpose. This also affects
the theme keys.

- Renamed `TableContainer` to `Table.Overflow`
- Renamed `Td` to `Table.Cell`
- Renamed `Th` to `Table.ColumnHeader`
- Renamed `Tr` to `Table.Row`
- Renamed `Thead` to `Table.Header`
- Renamed `Tbody` to `Table.Body`
- Renamed `Tfoot` to `Table.Footer`
- Renamed `isNumeric` to `numeric`

### Menu

- Removed `rootProps` in favor of rendering the `Menu.Positioner` component
- Renamed `MenuButton` to `Menu.Trigger`

### List

- Removed `OrderedList` and `UnorderedList` in favor of using the `List`
  component with the `as` prop.

- To change the list style type, you can use the `styleType` prop on the `List`
  component.

## Added

### Typography components

We've added `Em` , `Strong`, `Quote` and `Span` components

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

### Bleed component

The `Bleed` component applied a negative margin to allow content to bleed out
into the surrounding layout.

```tsx
export const Demo = () => (
  <Box padding="4" borderWidth="1px">
    <Bleed inline="4" bg="pink.100" padding="3">
      Some bleed
    </Bleed>
    <Box padding="4">Inner text</Box>
  </Box>
)
```

### Namespace components

You can import components by leveraging the dot notation.

```tsx
import { Accordion } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger>Click me</Accordion.Trigger>
        <Accordion.Content>Panel content</Accordion.Content>
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
