# FormControl → Field Migration Guide

This document outlines the migration from Chakra UI v2 FormControl components to
v3 Field and Fieldset.

## Component Mapping

### Standard Form (v2 → v3)

| v2 Component       | v3 Component       |
| ------------------ | ------------------ |
| `FormControl`      | `Field.Root`       |
| `FormLabel`        | `Field.Label`      |
| `FormHelperText`   | `Field.HelperText` |
| `FormErrorMessage` | `Field.ErrorText`  |

### Fieldset Form (v2 → v3)

| v2 Component                | v3 Component          |
| --------------------------- | --------------------- |
| `FormControl as='fieldset'` | `Fieldset.Root`       |
| `FormLabel as='legend'`     | `Fieldset.Legend`     |
| `FormHelperText`            | `Fieldset.HelperText` |
| `FormErrorMessage`          | `Fieldset.ErrorText`  |

### New Components in v3

| Component                 | Description                              |
| ------------------------- | ---------------------------------------- |
| `Field.ErrorIcon`         | Icon displayed in error messages         |
| `Field.RequiredIndicator` | Indicator for required fields (e.g., \*) |
| `Fieldset.Content`        | Content wrapper for fieldset body        |

## Prop Changes

| v2 Prop      | v3 Prop    | Notes        |
| ------------ | ---------- | ------------ |
| `isInvalid`  | `invalid`  | Boolean prop |
| `isRequired` | `required` | Boolean prop |
| `isDisabled` | `disabled` | Boolean prop |
| `isReadOnly` | `readOnly` | Boolean prop |

## Import Changes

**v2:**

```tsx
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react"
```

**v3 (Standard Form):**

```tsx
import { Field } from "@chakra-ui/react"
```

**v3 (Fieldset):**

```tsx
import { Fieldset } from "@chakra-ui/react"
```

## Usage Examples

### Basic Form Field

**v2:**

```tsx
import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

;<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type="email" />
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
```

**v3:**

```tsx
import { Field, Input } from "@chakra-ui/react"

;<Field.Root>
  <Field.Label>Email address</Field.Label>
  <Input type="email" />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
</Field.Root>
```

### Form with Error Message

**v2:**

```tsx
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react"

function Example() {
  const [input, setInput] = useState("")
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ""

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>Email</FormLabel>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}
```

**v3:**

```tsx
import { Field, Input } from "@chakra-ui/react"

function Example() {
  const [input, setInput] = useState("")
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ""

  return (
    <Field.Root invalid={isError}>
      <Field.Label>Email</Field.Label>
      <Input type="email" value={input} onChange={handleInputChange} />
      {!isError ? (
        <Field.HelperText>
          Enter the email you'd like to receive the newsletter on.
        </Field.HelperText>
      ) : (
        <Field.ErrorText>Email is required.</Field.ErrorText>
      )}
    </Field.Root>
  )
}
```

### Required Field

**v2:**

```tsx
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

;<FormControl isRequired>
  <FormLabel>First name</FormLabel>
  <Input placeholder="First name" />
</FormControl>
```

**v3:**

```tsx
import { Field, Input } from "@chakra-ui/react"

;<Field.Root required>
  <Field.Label>First name</Field.Label>
  <Input placeholder="First name" />
</Field.Root>
```

### Disabled Field

**v2:**

```tsx
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

;<FormControl isDisabled>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
</FormControl>
```

**v3:**

```tsx
import { Field, Input } from "@chakra-ui/react"

;<Field.Root disabled>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
</Field.Root>
```

### Fieldset (Radio Group)

**v2:**

```tsx
import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react"

;<FormControl as="fieldset">
  <FormLabel as="legend">Favorite Naruto Character</FormLabel>
  <RadioGroup defaultValue="Itachi">
    <HStack spacing="24px">
      <Radio value="Sasuke">Sasuke</Radio>
      <Radio value="Nagato">Nagato</Radio>
      <Radio value="Itachi">Itachi</Radio>
    </HStack>
  </RadioGroup>
  <FormHelperText>Select only if you're a fan.</FormHelperText>
</FormControl>
```

**v3:**

```tsx
import { Fieldset, HStack, Radio, RadioGroup } from "@chakra-ui/react"

;<Fieldset.Root>
  <Fieldset.Legend>Favorite Naruto Character</Fieldset.Legend>
  <RadioGroup defaultValue="Itachi">
    <HStack spacing="24px">
      <Radio value="Sasuke">Sasuke</Radio>
      <Radio value="Nagato">Nagato</Radio>
      <Radio value="Itachi">Itachi</Radio>
    </HStack>
  </RadioGroup>
  <Fieldset.HelperText>Select only if you're a fan.</Fieldset.HelperText>
</Fieldset.Root>
```

### Read-Only Field

**v2:**

```tsx
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

;<FormControl isReadOnly>
  <FormLabel>Email</FormLabel>
  <Input type="email" value="user@example.com" />
</FormControl>
```

**v3:**

```tsx
import { Field, Input } from "@chakra-ui/react"

;<Field.Root readOnly>
  <Field.Label>Email</Field.Label>
  <Input type="email" value="user@example.com" />
</Field.Root>
```

## Running the Codemod

To automatically migrate your FormControl components, run:

```bash
npx @chakra-ui/codemod transform form-control <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform form-control ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform form-control ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform form-control ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Import `Field` (or `Fieldset` for fieldset forms)
2. **Component Names**: Replace with namespace syntax:
   - `FormControl` → `Field.Root` (or `Fieldset.Root`)
   - `FormLabel` → `Field.Label` (or `Fieldset.Legend` for fieldsets)
   - `FormHelperText` → `Field.HelperText` (or `Fieldset.HelperText`)
   - `FormErrorMessage` → `Field.ErrorText` (or `Fieldset.ErrorText`)
3. **Props**: Update boolean props:
   - `isInvalid` → `invalid`
   - `isRequired` → `required`
   - `isDisabled` → `disabled`
   - `isReadOnly` → `readOnly`
4. **Fieldset Special Case**:
   - Replace `FormControl as='fieldset'` with `Fieldset.Root`
   - Replace `FormLabel as='legend'` with `Fieldset.Legend`

## Breaking Changes

### Component Names

- All FormControl components now use namespace imports
- `FormControl as='fieldset'` replaced with dedicated `Fieldset` component
- `FormErrorMessage` renamed to `Field.ErrorText` / `Fieldset.ErrorText`

### Prop Names

- All boolean props changed from `is*` to lowercase (e.g., `isInvalid` →
  `invalid`)

### No Other Changes

- All styling props continue to work
- Form validation behavior remains the same
- Accessibility features preserved

## Benefits

The v3 Field and Fieldset components provide:

- **Better Semantics**: Separate Field and Fieldset components for clarity
- **Consistent API**: All components use namespace imports
- **Better TypeScript Support**: Improved type inference
- **Simpler Props**: Boolean props without `is` prefix
- **New Components**: `ErrorIcon`, `RequiredIndicator` for enhanced UX
- **Ark UI Integration**: Built on Ark UI for better accessibility
- **Reduced Bundle Size**: Tree-shakeable namespace exports

## Notes

- Use `Field` for standard form controls (input, textarea, select)
- Use `Fieldset` for grouped controls (radio groups, checkbox groups)
- The `as='fieldset'` pattern is automatically detected and transformed to
  `Fieldset.Root`
- All accessibility features from v2 are preserved and enhanced in v3
