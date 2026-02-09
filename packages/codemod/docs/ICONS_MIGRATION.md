# Icons Migration Guide (v2 → v3)

This guide covers the migration of Chakra UI v2 icons from `@chakra-ui/icons` to
`react-icons/lu` (Lucide icons) in v3.

## Overview

In v3, the `@chakra-ui/icons` package has been removed. Icons are now sourced
from the `react-icons` library, primarily using Lucide icons (`react-icons/lu`).
The codemod automatically handles icon transformations.

**Note**: This codemod only transforms `@chakra-ui/icons` imports. If you use
icons in `Button` or `IconButton` components, those have separate codemods that
transform the component APIs:

- **Button codemod**: Transforms `leftIcon`/`rightIcon` props → icons as
  children
- **IconButton codemod**: Transforms `icon` prop → icon as child

Run all relevant codemods for complete migration.

## Why the Change?

- **Removed package**: `@chakra-ui/icons` is no longer maintained in v3
- **Better variety**: `react-icons/lu` provides 1,541+ Lucide icons
- **Flexibility**: Users can choose from multiple icon libraries (Lucide,
  Material Design, Heroicons, Font Awesome, etc.)
- **Direct usage**: Icons are standard React components without Chakra-specific
  wrappers

## Transformation Strategy

The codemod intelligently transforms icons based on whether they have props:

- **Icons without props**: Use react-icons directly (cleaner, more concise)
- **Icons with props**: Wrap in Chakra's `Icon` component to preserve style
  props (color tokens, `boxSize`, etc.)

**v2 (no props):**

```tsx
import { AddIcon } from "@chakra-ui/icons"

;<AddIcon />
```

**v3 (no props - direct usage):**

```tsx
import { LuPlus } from "react-icons/lu"

;<LuPlus />
```

**v2 (with props):**

```tsx
import { AddIcon } from "@chakra-ui/icons"

;<AddIcon boxSize={6} color="blue.500" />
```

**v3 (with props - wrapped):**

```tsx
import { Icon } from "@chakra-ui/react"
import { LuPlus } from "react-icons/lu"

;<Icon as={LuPlus} boxSize={6} color="blue.500" />
```

## Complete Icon Mapping (69 icons)

All v2 icons are mapped to Lucide icons from `react-icons/lu`:

| v2 Icon               | v3 Icon (Lucide)  | Notes                      |
| --------------------- | ----------------- | -------------------------- |
| `AddIcon`             | `LuPlus`          | Direct equivalent          |
| `ArrowBackIcon`       | `LuArrowLeft`     | Directional                |
| `ArrowDownIcon`       | `LuArrowDown`     | Directional                |
| `ArrowForwardIcon`    | `LuArrowRight`    | Directional                |
| `ArrowLeftIcon`       | `LuArrowLeft`     | Same as ArrowBackIcon      |
| `ArrowRightIcon`      | `LuArrowRight`    | Same as ArrowForwardIcon   |
| `ArrowUpIcon`         | `LuArrowUp`       | Directional                |
| `ArrowUpDownIcon`     | `LuArrowUpDown`   | Bi-directional             |
| `AtSignIcon`          | `LuAtSign`        | Direct equivalent          |
| `AttachmentIcon`      | `LuPaperclip`     | Semantic match             |
| `BellIcon`            | `LuBell`          | Direct equivalent          |
| `CalendarIcon`        | `LuCalendar`      | Direct equivalent          |
| `ChatIcon`            | `LuMessageCircle` | Semantic match             |
| `CheckIcon`           | `LuCheck`         | Direct equivalent          |
| `CheckCircleIcon`     | `LuCheckCircle`   | Direct equivalent          |
| `ChevronDownIcon`     | `LuChevronDown`   | Direct equivalent          |
| `ChevronLeftIcon`     | `LuChevronLeft`   | Direct equivalent          |
| `ChevronRightIcon`    | `LuChevronRight`  | Direct equivalent          |
| `ChevronUpIcon`       | `LuChevronUp`     | Direct equivalent          |
| `CloseIcon`           | `LuX`             | Direct equivalent          |
| `CopyIcon`            | `LuCopy`          | Direct equivalent          |
| `DeleteIcon`          | `LuTrash2`        | Semantic match             |
| `DownloadIcon`        | `LuDownload`      | Direct equivalent          |
| `DragHandleIcon`      | `LuGripVertical`  | Semantic match             |
| `EditIcon`            | `LuPencil`        | Semantic match             |
| `EmailIcon`           | `LuMail`          | Direct equivalent          |
| `ExternalLinkIcon`    | `LuExternalLink`  | Direct equivalent          |
| `HamburgerIcon`       | `LuMenu`          | Direct equivalent          |
| `InfoIcon`            | `LuInfo`          | Direct equivalent          |
| `InfoOutlineIcon`     | `LuInfo`          | Same as InfoIcon           |
| `LinkIcon`            | `LuLink`          | Direct equivalent          |
| `LockIcon`            | `LuLock`          | Direct equivalent          |
| `MinusIcon`           | `LuMinus`         | Direct equivalent          |
| `MoonIcon`            | `LuMoon`          | Direct equivalent          |
| `NotAllowedIcon`      | `LuBan`           | Prohibition symbol         |
| `PhoneIcon`           | `LuPhone`         | Direct equivalent          |
| `PlusSquareIcon`      | `LuSquarePlus`    | Direct equivalent          |
| `QuestionIcon`        | `LuHelpCircle`    | Semantic match             |
| `QuestionOutlineIcon` | `LuHelpCircle`    | Same as QuestionIcon       |
| `RepeatIcon`          | `LuRepeat`        | Direct equivalent          |
| `RepeatClockIcon`     | `LuRepeat`        | No clock variant in Lucide |
| `SearchIcon`          | `LuSearch`        | Direct equivalent          |
| `Search2Icon`         | `LuSearch`        | Same as SearchIcon         |
| `SettingsIcon`        | `LuSettings`      | Direct equivalent          |
| `SmallAddIcon`        | `LuPlus`          | Same as AddIcon            |
| `SmallCloseIcon`      | `LuX`             | Same as CloseIcon          |
| `SpinnerIcon`         | `LuLoader2`       | Loading spinner            |
| `StarIcon`            | `LuStar`          | Direct equivalent          |
| `SunIcon`             | `LuSun`           | Direct equivalent          |
| `TimeIcon`            | `LuClock`         | Direct equivalent          |
| `TriangleDownIcon`    | `LuTriangle`      | May need CSS rotation      |
| `TriangleUpIcon`      | `LuTriangle`      | Default orientation        |
| `UnlockIcon`          | `LuUnlock`        | Direct equivalent          |
| `UpDownIcon`          | `LuArrowUpDown`   | Same as ArrowUpDownIcon    |
| `ViewIcon`            | `LuEye`           | Direct equivalent          |
| `ViewOffIcon`         | `LuEyeOff`        | Direct equivalent          |
| `WarningIcon`         | `LuAlertTriangle` | Semantic match             |
| `WarningTwoIcon`      | `LuAlertCircle`   | Circle variant             |

## Transformation Examples

### Basic Icon Usage (No Props)

When icons have no props, they're used directly for cleaner code:

**v2:**

```tsx
import { CheckIcon } from "@chakra-ui/icons"

;<CheckIcon />
```

**v3:**

```tsx
import { LuCheck } from "react-icons/lu"

;<LuCheck />
```

### Icon with Style Props

When icons have Chakra props, they're wrapped in `Icon` component:

**v2:**

```tsx
import { AddIcon } from "@chakra-ui/icons"

;<AddIcon boxSize={6} color="blue.500" />
```

**v3:**

```tsx
import { Icon } from "@chakra-ui/react"
import { LuPlus } from "react-icons/lu"

;<Icon as={LuPlus} boxSize={6} color="blue.500" />
```

### Multiple Icons (No Props)

**v2:**

```tsx
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'

<AddIcon />
<EditIcon />
<DeleteIcon />
```

**v3:**

```tsx
import { LuPlus, LuPencil, LuTrash2 } from 'react-icons/lu'

<LuPlus />
<LuPencil />
<LuTrash2 />
```

### Icon in Button (No Props)

In v3, `leftIcon` and `rightIcon` props are removed. Icons are placed as direct
children at the start/end of the button:

**v2:**

```tsx
import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

;<Button leftIcon={<AddIcon />}>Add Item</Button>
```

**v3:**

```tsx
import { Button } from "@chakra-ui/react"
import { LuPlus } from "react-icons/lu"

;<Button>
  <LuPlus />
  Add Item
</Button>
```

### Icon in Button (With Props)

Icons with props are wrapped in `Icon` component and placed as children:

**v2:**

```tsx
import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

;<Button leftIcon={<AddIcon boxSize={5} color="blue.500" />}>Add Item</Button>
```

**v3:**

```tsx
import { Button, Icon } from "@chakra-ui/react"
import { LuPlus } from "react-icons/lu"

;<Button>
  <Icon as={LuPlus} boxSize={5} color="blue.500" />
  Add Item
</Button>
```

### Icon in Button (rightIcon)

**v2:**

```tsx
;<Button rightIcon={<ArrowForwardIcon />}>Next</Button>
```

**v3:**

```tsx
;<Button>
  Next
  <LuArrowRight />
</Button>
```

### Icon in IconButton

In v3, the `icon` prop is removed. Icons are placed as direct children:

**v2:**

```tsx
import { CloseIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

;<IconButton aria-label="Close" icon={<CloseIcon />} />
```

**v3:**

```tsx
import { IconButton } from "@chakra-ui/react"
import { LuX } from "react-icons/lu"

;<IconButton aria-label="Close">
  <LuX />
</IconButton>
```

## Import Deduplication

The codemod automatically deduplicates icons that map to the same Lucide icon.
The `Icon` component is only imported when needed (when icons have props):

**v2:**

```tsx
import {
  AddIcon,
  ArrowBackIcon,
  ArrowLeftIcon,
  SmallAddIcon,
} from "@chakra-ui/icons"

<AddIcon />
<SmallAddIcon />
<ArrowLeftIcon />
<ArrowBackIcon />
```

**v3 (no props - no Icon import):**

```tsx
import { LuArrowLeft, LuPlus } from "react-icons/lu"

<LuPlus />
<LuPlus />
<LuArrowLeft />
<LuArrowLeft />

// LuPlus used for both AddIcon and SmallAddIcon
// LuArrowLeft used for both ArrowLeftIcon and ArrowBackIcon
```

## Style Props Preservation

All Chakra style props are preserved on the `Icon` wrapper:

| Prop Type      | Example                     | Works in v3? |
| -------------- | --------------------------- | ------------ |
| Color tokens   | `color="blue.500"`          | ✅ Yes       |
| Size utilities | `boxSize={6}`               | ✅ Yes       |
| Width/Height   | `w={8} h={8}`               | ✅ Yes       |
| Responsive     | `boxSize={[4, 6, 8]}`       | ✅ Yes       |
| Pseudo props   | `_hover={{ color: "red" }}` | ✅ Yes       |
| Other props    | `className`, `style`, etc.  | ✅ Yes       |

## Complete Example

This example shows the full v2 to v3 transformation including Button and
IconButton changes. Note that in v3:

- **Button**: `leftIcon`/`rightIcon` props → icons as start/end children
- **IconButton**: `icon` prop → icon as direct child
- **Icons without props**: Used directly for cleaner code
- **Icons with props**: Wrapped in `Icon` component

### Before (v2)

```tsx
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons"
import { Box, Button, IconButton, Stack } from "@chakra-ui/react"

function ToolbarExample() {
  return (
    <Stack direction="row" spacing={4}>
      <Button leftIcon={<AddIcon />} colorScheme="blue">
        Add Item
      </Button>

      <IconButton aria-label="Edit" icon={<EditIcon />} colorScheme="green" />

      <IconButton aria-label="Delete" icon={<DeleteIcon />} colorScheme="red" />

      <Box>
        <CheckIcon boxSize={6} color="green.500" />
        <CloseIcon boxSize={6} color="red.500" />
      </Box>
    </Stack>
  )
}
```

### After (v3)

```tsx
import { Box, Button, Icon, IconButton, Stack } from "@chakra-ui/react"
import { LuCheck, LuPencil, LuPlus, LuTrash2, LuX } from "react-icons/lu"

function ToolbarExample() {
  return (
    <Stack direction="row" spacing={4}>
      {/* leftIcon prop removed - icon is now first child */}
      <Button colorScheme="blue">
        <LuPlus />
        Add Item
      </Button>

      {/* icon prop removed - icon is now direct child */}
      <IconButton aria-label="Edit" colorScheme="green">
        <LuPencil />
      </IconButton>

      <IconButton aria-label="Delete" colorScheme="red">
        <LuTrash2 />
      </IconButton>

      <Box>
        {/* Icons with props - wrapped in Icon component */}
        <Icon as={LuCheck} boxSize={6} color="green.500" />
        <Icon as={LuX} boxSize={6} color="red.500" />
      </Box>
    </Stack>
  )
}
```

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform icons src/**/*.tsx
```

## Installation Requirements

After running the codemod, ensure `react-icons` is installed:

```bash
# npm
npm install react-icons

# yarn
yarn add react-icons

# pnpm
pnpm add react-icons
```

## Manual Review Required

After running the codemod, review:

1. **Triangle Icons**: `TriangleDownIcon` uses `LuTriangle` which may need CSS
   rotation for proper downward direction:

   ```tsx
   // May need manual adjustment
   <Icon as={LuTriangle} transform="rotate(180deg)" />
   ```

2. **Spinner Animation**: `SpinnerIcon` maps to `LuLoader2`. You may need to add
   animation:

   ```tsx
   <Icon as={LuLoader2} animation="spin 1s linear infinite" />
   ```

3. **Icon Variants**: Some icons like `RepeatClockIcon` don't have exact Lucide
   equivalents. Review these mappings:
   - `RepeatClockIcon` → `LuRepeat` (no clock variant)
   - `InfoOutlineIcon` → `LuInfo` (same as InfoIcon)
   - `QuestionOutlineIcon` → `LuHelpCircle` (same as QuestionIcon)

4. **react-icons Installation**: Verify `react-icons` is installed as a
   dependency

5. **Custom Icon Usage**: If icons were used in advanced patterns (HOCs, dynamic
   rendering, custom wrappers), verify behavior

## Alternative Icon Libraries

While the codemod uses Lucide icons (`react-icons/lu`) by default, you can
manually use other react-icons libraries:

- **Material Design**: `react-icons/md` (2,100+ icons)
- **Heroicons**: `react-icons/hi` (316 icons)
- **Font Awesome**: `react-icons/fa` (2,048+ icons)
- **Feather**: `react-icons/fi` (286 icons)
- **IcoMoon**: `react-icons/im`

Example:

```tsx
import { Icon } from "@chakra-ui/react"
import { MdHome } from "react-icons/md"

;<Icon as={MdHome} boxSize={6} />
```

## Using Custom Icons

If you need custom icons, use the `createIcon` utility:

```tsx
import { createIcon } from '@chakra-ui/react'

export const CustomIcon = createIcon({
  displayName: 'CustomIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill="currentColor"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
    />
  ),
})

// Usage
<CustomIcon boxSize={6} color="blue.500" />
```

## Chakra UI v3 Internal Icons

Note: Chakra UI v3 includes 19 internal icons used by components, but these are
**not exported** for public use:

- CheckIcon, ChevronDownIcon, ChevronRightIcon, CircleIcon, CloseIcon,
  IndeterminateIcon, etc.

These are only for internal component use. For your application, use
`react-icons` or `createIcon()`.

## Troubleshooting

### When to use Icon wrapper vs direct icon

**Rule**: Use the Icon wrapper only when you need Chakra-specific style props.

```tsx
// ✅ No Chakra props? Use icon directly as child (cleaner)
<Button>
  <LuPlus />
  Add
</Button>

// ✅ Has Chakra props? Wrap in Icon component
<Button>
  <Icon as={LuPlus} boxSize={5} color="blue.500" />
  Add
</Button>

// ❌ Don't wrap unnecessarily
<Button>
  <Icon as={LuPlus} />  {/* Icon not needed here */}
  Add
</Button>
```

### Button and IconButton v3 Changes

Remember these API changes when migrating:

```tsx
// ❌ v2 API - leftIcon/rightIcon props
<Button leftIcon={<LuPlus />}>Add</Button>
<IconButton icon={<LuX />} />

// ✅ v3 API - icons as children
<Button><LuPlus /> Add</Button>
<IconButton><LuX /></IconButton>
```

### Icons don't support Chakra style props

**Problem**: Icons used directly from `react-icons` don't support Chakra style
props like `color="blue.500"`.

**Solution**: Wrap icons in `Icon` component when you need Chakra props:

```tsx
// ❌ Wrong - Chakra props won't work on react-icons directly
<LuPlus color="blue.500" />

// ✅ Correct - Wrap in Icon to use Chakra props
<Icon as={LuPlus} color="blue.500" />

// ✅ Also correct - No Chakra props needed
<LuPlus />
```

### TypeScript errors with `as` prop

**Problem**: TypeScript complains about the `as` prop type.

**Solution**: Ensure you're passing a component reference (not JSX):

```tsx
// ❌ Wrong - JSX element
<Icon as={<LuPlus />} />

// ✅ Correct - Component reference
<Icon as={LuPlus} />
```

### Import conflicts

**Problem**: Multiple icons with similar names from different libraries.

**Solution**: Use named imports with aliases:

```tsx
import { LuPlus } from "react-icons/lu"
import { MdAdd as MdAddIcon } from "react-icons/md"
```

## Additional Resources

- [Icon Component Documentation](https://chakra-ui.com/docs/components/icon)
- [react-icons Library](https://react-icons.github.io/react-icons/)
- [Lucide Icons](https://lucide.dev/)
- [Migration Guide](https://chakra-ui.com/docs/get-started/migration)
- [createIcon Utility](https://chakra-ui.com/docs/components/icon#using-createicon)
