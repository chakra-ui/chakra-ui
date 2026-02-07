# Editable Migration Guide

This document outlines the migration from Chakra UI v2 Editable component to v3.

## Component Structure Changes

### v2 Structure

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Click to edit">
  <EditablePreview />
  <EditableInput />
</Editable>
```

### v3 Structure

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Click to edit">
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

## Prop Changes

### Boolean and Standard Props

| v2 Prop              | v3 Prop         | Notes                                                |
| -------------------- | --------------- | ---------------------------------------------------- |
| `isDisabled`         | `disabled`      | Standard HTML attribute                              |
| `isPreviewFocusable` | (special)       | When `false`, adds `tabIndex={undefined}` to Preview |
| `selectAllOnFocus`   | `selectOnFocus` | Simplified prop name                                 |
| `startWithEditView`  | `defaultEdit`   | Renamed for clarity                                  |

### Event Handler Props

| v2 Prop    | v3 Prop         | Notes                         |
| ---------- | --------------- | ----------------------------- |
| `onChange` | `onValueChange` | Receives object: `{ value }`  |
| `onSubmit` | `onValueCommit` | Receives value string         |
| `onCancel` | `onValueRevert` | Called when edit is cancelled |

### Special Props

| v2 Prop         | v3 Prop/Behavior | Notes                                      |
| --------------- | ---------------- | ------------------------------------------ |
| `finalFocusRef` | `finalFocusEl`   | Now a function: `() => ref.current`        |
| `submitOnBlur`  | `submitMode`     | When `false`, becomes `submitMode='enter'` |

## Hook Changes

| v2 Hook               | v3 Hook              | Notes                     |
| --------------------- | -------------------- | ------------------------- |
| `useEditableControls` | `useEditableContext` | Provides same context API |

## Usage Examples

### Basic Editable with Input

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Take some chakra">
  <EditablePreview />
  <EditableInput />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Take some chakra">
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

### Editable with Textarea

**v2:**

```tsx
import { Editable, EditablePreview, EditableTextarea } from "@chakra-ui/react"

;<Editable defaultValue="Take some chakra">
  <EditablePreview />
  <EditableTextarea />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Take some chakra">
  <Editable.Preview />
  <Editable.Textarea />
</Editable.Root>
```

### Disabled Editable

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Disabled" isDisabled>
  <EditablePreview />
  <EditableInput />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Disabled" disabled>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

### With Event Handlers

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

function App() {
  const handleChange = (value) => console.log("change", value)
  const handleSubmit = (value) => console.log("submit", value)
  const handleCancel = () => console.log("cancel")

  return (
    <Editable
      defaultValue="Edit me"
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

function App() {
  const handleChange = ({ value }) => console.log("change", value)
  const handleSubmit = (value) => console.log("submit", value)
  const handleCancel = () => console.log("cancel")

  return (
    <Editable.Root
      defaultValue="Edit me"
      onValueChange={handleChange}
      onValueCommit={handleSubmit}
      onValueRevert={handleCancel}
    >
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
}
```

### With Final Focus

**v2:**

```tsx
import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from "@chakra-ui/react"
import { useRef } from "react"

function App() {
  const ref = useRef(null)

  return (
    <>
      <Editable defaultValue="Final fantasy" finalFocusRef={ref}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Input ref={ref} placeholder="Focus moves here" />
    </>
  )
}
```

**v3:**

```tsx
import { Editable, Input } from "@chakra-ui/react"
import { useRef } from "react"

function App() {
  const ref = useRef(null)

  return (
    <>
      <Editable.Root
        defaultValue="Final fantasy"
        finalFocusEl={() => ref.current}
      >
        <Editable.Preview />
        <Editable.Input />
      </Editable.Root>
      <Input ref={ref} placeholder="Focus moves here" />
    </>
  )
}
```

### Submit on Enter Only

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Press Enter to submit" submitOnBlur={false}>
  <EditablePreview />
  <EditableInput />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Press Enter to submit" submitMode="enter">
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

### Start in Edit Mode

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Already editing" startWithEditView>
  <EditablePreview />
  <EditableInput />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Already editing" defaultEdit>
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

### Non-Focusable Preview

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

;<Editable defaultValue="Click to edit" isPreviewFocusable={false}>
  <EditablePreview />
  <EditableInput />
</Editable>
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

;<Editable.Root defaultValue="Click to edit">
  <Editable.Preview tabIndex={undefined} />
  <Editable.Input />
</Editable.Root>
```

### With Custom Controls (v2 useEditableControls)

**v2:**

```tsx
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react"

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex>
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  )
}

function App() {
  return (
    <Editable defaultValue="Rasengan ⚡️">
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  )
}
```

**v3:**

```tsx
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

function App() {
  return (
    <Editable.Root defaultValue="Rasengan ⚡️">
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  )
}
```

### Using Context Hook (v3)

**v2:**

```tsx
import { useEditableControls } from "@chakra-ui/react"

function CustomComponent() {
  const { isEditing, getEditButtonProps } = useEditableControls()
  return <button {...getEditButtonProps()}>Edit</button>
}
```

**v3:**

```tsx
import { useEditableContext } from "@chakra-ui/react"

function CustomComponent() {
  const editable = useEditableContext()
  return <button onClick={() => editable.edit()}>Edit</button>
}
```

### Complete Example with All Features

**v2:**

```tsx
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"

function App() {
  return (
    <Editable
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
      selectAllOnFocus
      onSubmit={(value) => console.log("submitted:", value)}
      onChange={(value) => console.log("changed:", value)}
    >
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
```

**v3:**

```tsx
import { Editable } from "@chakra-ui/react"

function App() {
  return (
    <Editable.Root
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      submitMode="enter"
      selectOnFocus
      onValueCommit={(value) => console.log("submitted:", value)}
      onValueChange={({ value }) => console.log("changed:", value)}
    >
      <Editable.Preview tabIndex={undefined} />
      <Editable.Input />
    </Editable.Root>
  )
}
```

## Running the Codemod

To automatically migrate your Editable components, run:

```bash
npx @chakra-ui/codemod transform editable <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform editable ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform editable ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform editable ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Update Component Names**:
   - `<Editable>` → `<Editable.Root>`
   - `<EditablePreview>` → `<Editable.Preview>`
   - `<EditableInput>` → `<Editable.Input>`
   - `<EditableTextarea>` → `<Editable.Textarea>`

2. **Update Props**:
   - `isDisabled` → `disabled`
   - `onCancel` → `onValueRevert`
   - `onChange` → `onValueChange` (receives `{ value }`)
   - `onSubmit` → `onValueCommit`
   - `selectAllOnFocus` → `selectOnFocus`
   - `startWithEditView` → `defaultEdit`
   - `submitOnBlur={false}` → `submitMode='enter'`
   - `finalFocusRef={ref}` → `finalFocusEl={() => ref.current}`

3. **Handle Special Props**:
   - If `isPreviewFocusable={false}`, add `tabIndex={undefined}` to
     `<Editable.Preview>`
   - Remove `isPreviewFocusable` from Root

4. **Update Hooks**:
   - Replace `useEditableControls` with `useEditableContext`
   - Update context API usage (see examples above)

5. **Update Custom Controls**:
   - Replace prop getter pattern with new trigger components
   - Use `<Editable.Control>`, `<Editable.EditTrigger>`,
     `<Editable.SubmitTrigger>`, `<Editable.CancelTrigger>`

## Breaking Changes

### Component Naming

- `Editable` → `Editable.Root` (namespace component)
- `EditablePreview` → `Editable.Preview`
- `EditableInput` → `Editable.Input`
- `EditableTextarea` → `Editable.Textarea`

### Props Renamed

- `isDisabled` → `disabled`
- `onCancel` → `onValueRevert`
- `onChange` → `onValueChange`
- `onSubmit` → `onValueCommit`
- `selectAllOnFocus` → `selectOnFocus`
- `startWithEditView` → `defaultEdit`
- `finalFocusRef` → `finalFocusEl` (now a function)

### Props with Changed Behavior

- `submitOnBlur={false}` → `submitMode='enter'`
- `isPreviewFocusable={false}` → Add `tabIndex={undefined}` to Preview

### Hook Changes

- `useEditableControls` → `useEditableContext`
- Context API changed from prop getters to imperative methods

### Event Handler Signatures

- `onChange(value)` → `onValueChange({ value })`
- `onSubmit(value)` → `onValueCommit(value)` (unchanged)
- `onCancel()` → `onValueRevert()` (renamed only)

## Codemod Capabilities

The codemod will:

- ✅ Transform all component names to namespace syntax
- ✅ Transform `isDisabled` → `disabled`
- ✅ Transform event handlers: `onChange`, `onSubmit`, `onCancel`
- ✅ Transform `selectAllOnFocus` → `selectOnFocus`
- ✅ Transform `startWithEditView` → `defaultEdit`
- ✅ Transform `submitOnBlur={false}` → `submitMode='enter'`
- ✅ Transform `finalFocusRef` → `finalFocusEl` with function wrapper
- ✅ Handle `isPreviewFocusable={false}` by adding `tabIndex={undefined}` to
  Preview
- ✅ Transform `useEditableControls` → `useEditableContext` (imports and calls)
- ✅ Preserve all other props and attributes

## Benefits

The v3 Editable component provides:

- **Composable Architecture**: Build custom edit controls with trigger
  components
- **Better Context Access**: `useEditableContext` provides full control over
  edit state
- **Cleaner API**: Simplified prop names align with web standards
- **Flexible Controls**: Use built-in triggers or build fully custom controls
- **Better TypeScript Support**: Improved type inference with namespace
  components
- **Declarative Triggers**: Replace prop getters with declarative trigger
  components
- **Consistent Naming**: Event handlers follow consistent `onValue*` pattern

## Notes

- The `onValueChange` handler in v3 receives an object `{ value }`, not just the
  value string
- The `finalFocusEl` prop must be a function that returns the element, not a ref
  object
- When `submitOnBlur` is omitted or `true`, no `submitMode` prop is needed
  (default behavior)
- The `isPreviewFocusable={false}` transformation adds `tabIndex={undefined}`
  directly to Preview
- Custom controls in v3 use declarative trigger components instead of prop
  getters
- The v3 context API (`useEditableContext`) provides methods like `edit()`,
  `cancel()`, `submit()` instead of prop getters
