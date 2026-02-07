# Avatar Migration Guide

This document outlines the migration from Chakra UI v2 Avatar components to v3.

## Component Mapping

### v2 → v3

| v2 Component  | v3 Component      | Notes                                    |
| ------------- | ----------------- | ---------------------------------------- |
| `Avatar`      | `Avatar.Root`     | Container with declarative parts         |
| N/A           | `Avatar.Image`    | Image element (props moved from Avatar)  |
| N/A           | `Avatar.Fallback` | Fallback content (name/icon moved here)  |
| `AvatarBadge` | Float + Circle    | Requires manual migration, see badge doc |
| `AvatarGroup` | `AvatarGroup`     | No namespace, but `max` prop removed     |

## Import Changes

**v2:**

```tsx
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Avatar, AvatarGroup } from "@chakra-ui/react"
// For badge functionality, also import:
import { Circle, Float } from "@chakra-ui/react"
```

## Prop Changes

### Avatar.Root

Props that remain on `Avatar.Root`:

- `size` - Size variant
- `colorPalette` - Color scheme
- All styling props (bg, borderColor, etc.)

Props removed (no longer supported):

- `ignoreFallback` - No longer needed in v3
- `showBorder` - Use styling props instead (e.g., `border="2px solid"`,
  `borderColor="bg"`)

### Avatar.Image (new component)

Props moved from Avatar to `Avatar.Image`:

- `src` - Image source URL
- `srcSet` - Responsive image sources
- `sizes` - Image sizes for responsive images
- `alt` - Alt text
- `loading` - Loading strategy (lazy, eager)
- `referrerPolicy` - Referrer policy
- `crossOrigin` - CORS settings

### Avatar.Fallback (new component)

Props moved from Avatar to `Avatar.Fallback`:

- `name` - Name for generating initials
- `icon` - Custom fallback icon (moved as children)
- `iconLabel` → `aria-label` - Accessibility label for the fallback
- `getInitials` - Custom initials function (requires manual migration)

### AvatarGroup

Prop transformations:

- `spacing` → `spaceX` - Horizontal spacing between avatars
- `max` prop removed (no longer supported in v3)

## Usage Examples

### Basic Avatar

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar.Root>
  <Avatar.Fallback name="Dan Abrahmov" />
  <Avatar.Image src="https://bit.ly/dan-abramov" />
</Avatar.Root>
```

### Avatar with Size

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar
  size="xs"
  name="Kola Tioluwani"
  src="https://bit.ly/tioluwani-kolawole"
/>
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar.Root size="xs">
  <Avatar.Fallback name="Kola Tioluwani" />
  <Avatar.Image src="https://bit.ly/tioluwani-kolawole" />
</Avatar.Root>
```

### Avatar with Custom Icon

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar bg="red.500" icon={<AiOutlineUser fontSize="1.5rem" />} />
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar.Root bg="red.500">
  <Avatar.Fallback>
    <AiOutlineUser fontSize="1.5rem" />
  </Avatar.Fallback>
</Avatar.Root>
```

### Avatar with Name and Icon

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar name="Dan Abrahmov" icon={<AiOutlineUser />} />
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar.Root>
  <Avatar.Fallback name="Dan Abrahmov">
    <AiOutlineUser />
  </Avatar.Fallback>
</Avatar.Root>
```

### Avatar with Image Props

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar
  src="https://bit.ly/dan-abramov"
  loading="lazy"
  referrerPolicy="no-referrer"
  crossOrigin="anonymous"
/>
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"

;<Avatar.Root>
  <Avatar.Image
    src="https://bit.ly/dan-abramov"
    loading="lazy"
    referrerPolicy="no-referrer"
    crossOrigin="anonymous"
  />
</Avatar.Root>
```

### Avatar with Accessibility Label

**v2:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar icon={<AiOutlineUser />} iconLabel="User Avatar" />
```

**v3:**

```tsx
import { Avatar } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"

;<Avatar.Root>
  <Avatar.Fallback aria-label="User Avatar">
    <AiOutlineUser />
  </Avatar.Fallback>
</Avatar.Root>
```

### Avatar Group

**v2:**

```tsx
import { Avatar, AvatarGroup } from "@chakra-ui/react"

;<AvatarGroup size="md" max={2} spacing="1rem">
  <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
  <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
  <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
  <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
</AvatarGroup>
```

**v3:**

```tsx
import { Avatar, AvatarGroup } from "@chakra-ui/react"

;<AvatarGroup size="md" spaceX="1rem">
  <Avatar.Root>
    <Avatar.Fallback name="Ryan Florence" />
    <Avatar.Image src="https://bit.ly/ryan-florence" />
  </Avatar.Root>
  <Avatar.Root>
    <Avatar.Fallback name="Segun Adebayo" />
    <Avatar.Image src="https://bit.ly/sage-adebayo" />
  </Avatar.Root>
  <Avatar.Root>
    <Avatar.Fallback name="Kent Dodds" />
    <Avatar.Image src="https://bit.ly/kent-c-dodds" />
  </Avatar.Root>
  <Avatar.Root>
    <Avatar.Fallback name="Prosper Otemuyiwa" />
    <Avatar.Image src="https://bit.ly/prosper-baba" />
  </Avatar.Root>
  <Avatar.Root>
    <Avatar.Fallback name="Christian Nwamba" />
    <Avatar.Image src="https://bit.ly/code-beast" />
  </Avatar.Root>
</AvatarGroup>
```

### Avatar with Badge (Requires Manual Migration)

**v2:**

```tsx
import { Avatar, AvatarBadge } from "@chakra-ui/react"

;<Avatar>
  <AvatarBadge boxSize="1.25em" bg="green.500" />
</Avatar>
```

**v3:**

```tsx
import { Avatar, Circle, Float } from "@chakra-ui/react"

;<Avatar.Root>
  <Avatar.Image src="https://bit.ly/dan-abramov" />
  <Float placement="bottom-end" offsetX="1" offsetY="1">
    <Circle bg="green.500" size="8px" outline="0.2em solid" outlineColor="bg" />
  </Float>
</Avatar.Root>
```

For more details on badge migration, see:
https://chakra-ui.com/docs/components/avatar#badge

## Running the Codemod

To automatically migrate your Avatar components, run:

```bash
npx @chakra-ui/codemod transform avatar <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform avatar ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform avatar ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform avatar ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Keep `Avatar` import (no changes needed)
2. **Component Structure**: Refactor to use namespace syntax:
   - `<Avatar>` → `<Avatar.Root>`
   - Add `<Avatar.Image>` for src/image props
   - Add `<Avatar.Fallback>` for name/icon props
3. **Move Props**:
   - Image-related props → `Avatar.Image`
   - `name` prop → `Avatar.Fallback`
   - `icon` prop → `Avatar.Fallback` children
4. **AvatarGroup**: Remove `max` prop (no longer supported)
5. **AvatarBadge**: Manually migrate to `Float + Circle` pattern

## Breaking Changes

### Component Structure

- Avatar now uses a declarative composition pattern with separate Image and
  Fallback parts
- All image-related props must be on `Avatar.Image`
- The `name` prop must be on `Avatar.Fallback`

### Props Removed/Moved

- `src`, `srcSet`, `sizes`, `alt`, `loading`, `referrerPolicy`, `crossOrigin` →
  moved to `Avatar.Image`
- `name` → moved to `Avatar.Fallback`
- `icon` → moved to `Avatar.Fallback` children
- `iconLabel` → renamed to `aria-label` on `Avatar.Fallback`
- `getInitials` → requires manual migration (no direct equivalent)
- `ignoreFallback` → removed (no longer needed in v3)
- `showBorder` → removed (use styling props like `border` and `borderColor`
  instead)
- AvatarGroup `spacing` → renamed to `spaceX`
- AvatarGroup `max` prop → removed (no longer supported)

### AvatarBadge Component

- Removed in v3
- Must be replaced with `Float + Circle` composition
- See documentation for migration pattern

## Codemod Limitations

The codemod will:

- ✅ Transform Avatar to Avatar.Root with proper parts
- ✅ Move image props to Avatar.Image
- ✅ Move name prop to Avatar.Fallback
- ✅ Move icon prop to Avatar.Fallback children
- ✅ Transform iconLabel to aria-label on Avatar.Fallback
- ✅ Remove ignoreFallback prop (no longer needed)
- ✅ Remove showBorder prop (use styling props instead)
- ✅ Transform spacing to spaceX on AvatarGroup
- ✅ Remove max prop from AvatarGroup
- ⚠️ Add TODO comment for getInitials (requires manual migration)
- ⚠️ Add TODO comment for AvatarBadge (requires manual migration to Float +
  Circle)

## Benefits

The v3 Avatar component provides:

- **Declarative API**: Explicit control over image and fallback rendering
- **Better Composition**: Separate concerns for image, fallback, and badge
- **Improved Performance**: More control over when fallback is shown
- **Better TypeScript Support**: Improved type inference for each part
- **Clearer Intent**: Image and fallback concerns are separated
- **More Flexible**: Easier to customize individual parts

## Notes

- The `name` prop on Avatar.Fallback generates initials automatically
- Avatar.Image handles loading states and fallback to Avatar.Fallback on error
- AvatarGroup no longer supports the `max` prop for limiting visible avatars
- For badge functionality, use the Float + Circle composition pattern
- The `getInitials` prop requires manual migration as it involves custom logic
- All existing styling props continue to work on Avatar.Root
