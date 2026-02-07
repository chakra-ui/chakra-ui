# Card Component Migration Guide

This document outlines the migration from Chakra UI v2 Card components to v3.

## Component Mapping

### v2 → v3

| v2 Component | v3 Component  |
| ------------ | ------------- |
| `Card`       | `Card.Root`   |
| `CardHeader` | `Card.Header` |
| `CardBody`   | `Card.Body`   |
| `CardFooter` | `Card.Footer` |

### New Components in v3

| Component          | Description                               |
| ------------------ | ----------------------------------------- |
| `Card.Title`       | Semantic title component for card headers |
| `Card.Description` | Semantic description component            |

## Variant Changes

The Card component has updated variant names in v3:

| v2 Variant           | v3 Equivalent     | Notes                                |
| -------------------- | ----------------- | ------------------------------------ |
| `elevated`           | `elevated`        | No change                            |
| `outline`            | `outline`         | No change                            |
| `filled`             | `subtle`          | Renamed for clarity                  |
| `variant="unstyled"` | `unstyled` (prop) | Converted to boolean `unstyled` prop |

## Import Changes

**v2:**

```tsx
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react"
```

**v3:**

```tsx
import { Card } from "@chakra-ui/react"
```

In v3, all Card-related components are accessed through the `Card` namespace.

## Usage Examples

### Basic Card with Body

**v2:**

```tsx
import { Card, CardBody, Text } from "@chakra-ui/react"

;<Card>
  <CardBody>
    <Text>View a summary of all your customers over the last month.</Text>
  </CardBody>
</Card>
```

**v3:**

```tsx
import { Card, Text } from "@chakra-ui/react"

;<Card.Root>
  <Card.Body>
    <Text>View a summary of all your customers over the last month.</Text>
  </Card.Body>
</Card.Root>
```

### Card with Header and Body

**v2:**

```tsx
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react"

;<Card>
  <CardHeader>
    <Heading size="md">Client Report</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your clients over the last month.</Text>
  </CardBody>
</Card>
```

**v3:**

```tsx
import { Card, Heading, Text } from "@chakra-ui/react"

;<Card.Root>
  <Card.Header>
    <Heading size="md">Client Report</Heading>
  </Card.Header>
  <Card.Body>
    <Text>View a summary of all your clients over the last month.</Text>
  </Card.Body>
</Card.Root>
```

### Complete Card with Footer

**v2:**

```tsx
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react"

;<Card maxW="sm">
  <CardHeader>
    <Heading size="md">Living room Sofa</Heading>
  </CardHeader>
  <CardBody>
    <Text>This sofa is perfect for modern tropical spaces.</Text>
    <Text color="blue.600" fontSize="2xl">
      $450
    </Text>
  </CardBody>
  <CardFooter>
    <Button variant="solid" colorScheme="blue">
      Buy now
    </Button>
  </CardFooter>
</Card>
```

**v3:**

```tsx
import { Button, Card, Heading } from "@chakra-ui/react"

;<Card.Root maxW="sm">
  <Card.Header>
    <Heading size="md">Living room Sofa</Heading>
  </Card.Header>
  <Card.Body>
    <Text>This sofa is perfect for modern tropical spaces.</Text>
    <Text color="blue.600" fontSize="2xl">
      $450
    </Text>
  </Card.Body>
  <Card.Footer>
    <Button variant="solid" colorScheme="blue">
      Buy now
    </Button>
  </Card.Footer>
</Card.Root>
```

### Card with Direction and Variant

**v2:**

```tsx
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"

;<Card
  direction={{ base: "column", sm: "row" }}
  overflow="hidden"
  variant="outline"
>
  <Image
    objectFit="cover"
    maxW={{ base: "100%", sm: "200px" }}
    src="https://example.com/image.jpg"
    alt="Caffe Latte"
  />
  <Stack>
    <CardBody>
      <Heading size="md">The perfect latte</Heading>
      <Text py="2">Caffè latte is a coffee beverage.</Text>
    </CardBody>
    <CardFooter>
      <Button variant="solid" colorScheme="blue">
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
```

**v3:**

```tsx
import { Button, Card, Heading, Image, Stack, Text } from "@chakra-ui/react"

;<Card.Root
  direction={{ base: "column", sm: "row" }}
  overflow="hidden"
  variant="outline"
>
  <Image
    objectFit="cover"
    maxW={{ base: "100%", sm: "200px" }}
    src="https://example.com/image.jpg"
    alt="Caffe Latte"
  />
  <Stack>
    <Card.Body>
      <Heading size="md">The perfect latte</Heading>
      <Text py="2">Caffè latte is a coffee beverage.</Text>
    </Card.Body>
    <Card.Footer>
      <Button variant="solid" colorScheme="blue">
        Buy Latte
      </Button>
    </Card.Footer>
  </Stack>
</Card.Root>
```

### Card with Alignment

**v2:**

```tsx
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react"

;<Card align="center">
  <CardHeader>
    <Heading size="md">Customer dashboard</Heading>
  </CardHeader>
  <CardBody>
    <Text>View a summary of all your customers.</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme="blue">View here</Button>
  </CardFooter>
</Card>
```

**v3:**

```tsx
import { Button, Card, Heading, Text } from "@chakra-ui/react"

;<Card.Root align="center">
  <Card.Header>
    <Heading size="md">Customer dashboard</Heading>
  </Card.Header>
  <Card.Body>
    <Text>View a summary of all your customers.</Text>
  </Card.Body>
  <Card.Footer>
    <Button colorScheme="blue">View here</Button>
  </Card.Footer>
</Card.Root>
```

### Multiple Cards with Variants

**v2:**

```tsx
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"

;<Stack spacing="4">
  {["elevated", "outline", "filled", "unstyled"].map((variant) => (
    <Card key={variant} variant={variant}>
      <CardHeader>
        <Heading size="md">{variant}</Heading>
      </CardHeader>
      <CardBody>
        <Text>variant = {variant}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
```

**v3:**

```tsx
import { Card, Heading, Stack, Text } from "@chakra-ui/react"

;<Stack spacing="4">
  {["elevated", "outline", "filled", "unstyled"].map((variant) => (
    <Card.Root key={variant} variant={variant}>
      <Card.Header>
        <Heading size="md">{variant}</Heading>
      </Card.Header>
      <Card.Body>
        <Text>variant = {variant}</Text>
      </Card.Body>
    </Card.Root>
  ))}
</Stack>
```

### Multiple Cards with Sizes

**v2:**

```tsx
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"

;<Stack spacing="4">
  {["sm", "md", "lg"].map((size) => (
    <Card key={size} size={size}>
      <CardHeader>
        <Heading size="md">{size}</Heading>
      </CardHeader>
      <CardBody>
        <Text>size = {size}</Text>
      </CardBody>
    </Card>
  ))}
</Stack>
```

**v3:**

```tsx
import { Card, Heading, Stack, Text } from "@chakra-ui/react"

;<Stack spacing="4">
  {["sm", "md", "lg"].map((size) => (
    <Card.Root key={size} size={size}>
      <Card.Header>
        <Heading size="md">{size}</Heading>
      </Card.Header>
      <Card.Body>
        <Text>size = {size}</Text>
      </Card.Body>
    </Card.Root>
  ))}
</Stack>
```

## Variant Migration Examples

### Filled Variant → Subtle

**v2:**

```tsx
import { Card, CardBody, Text } from "@chakra-ui/react"

;<Card variant="filled">
  <CardBody>
    <Text>Filled card background</Text>
  </CardBody>
</Card>
```

**v3:**

```tsx
import { Card, Text } from "@chakra-ui/react"

;<Card.Root variant="subtle">
  <Card.Body>
    <Text>Filled card background</Text>
  </Card.Body>
</Card.Root>
```

### Unstyled Variant → Unstyled Prop

**v2:**

```tsx
import { Card, CardBody, Text } from "@chakra-ui/react"

;<Card variant="unstyled">
  <CardBody>
    <Text>Unstyled card</Text>
  </CardBody>
</Card>
```

**v3:**

```tsx
import { Card, Text } from "@chakra-ui/react"

;<Card.Root unstyled>
  <Card.Body>
    <Text>Unstyled card</Text>
  </Card.Body>
</Card.Root>
```

### Elevated and Outline (No Change)

**v2:**

```tsx
import { Card, CardBody, Text } from "@chakra-ui/react"

;<>
  <Card variant="elevated">
    <CardBody>
      <Text>Elevated</Text>
    </CardBody>
  </Card>
  <Card variant="outline">
    <CardBody>
      <Text>Outline</Text>
    </CardBody>
  </Card>
</>
```

**v3:**

```tsx
import { Card, Text } from "@chakra-ui/react"

;<>
  <Card.Root variant="elevated">
    <Card.Body>
      <Text>Elevated</Text>
    </Card.Body>
  </Card.Root>
  <Card.Root variant="outline">
    <Card.Body>
      <Text>Outline</Text>
    </Card.Body>
  </Card.Root>
</>
```

## Running the Codemod

To automatically migrate your Card components, run:

```bash
npx @chakra-ui/codemod transform card <path>
```

### Options

- `--dry` - Do a dry-run without making changes
- `--print` - Print the changed output for comparison

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform card ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform card ./src --dry

# Print changes for comparison
npx @chakra-ui/codemod transform card ./src --print
```

## Manual Migration Steps

If you prefer to migrate manually or need to handle edge cases:

1. **Import Changes**: Import `Card` from `@chakra-ui/react` instead of
   individual component names
2. **Component Names**: Replace component names with their v3 equivalents using
   dot notation:
   - `Card` → `Card.Root`
   - `CardHeader` → `Card.Header`
   - `CardBody` → `Card.Body`
   - `CardFooter` → `Card.Footer`
3. **Props**: All props remain the same - no prop changes needed
4. **Styling**: All existing styling props work the same way

## Breaking Changes

The Card component has minimal breaking changes:

### Component Names

- All Card subcomponents now use namespace imports (e.g., `Card.Body` instead of
  `CardBody`)

### Variant Names

- `filled` variant renamed to `subtle`
- `variant="unstyled"` converted to `unstyled` boolean prop
- `elevated` and `outline` variants remain unchanged

### No Other Changes

- All other props from v2 work the same way in v3
- All size options (`sm`, `md`, `lg`) are preserved
- All style props continue to work
- Default variant is `outline` in both versions

## Benefits

The v3 Card component provides:

- **Consistent API**: All components use namespace imports
- **Better TypeScript support**: Improved type inference and autocomplete
- **Simplified imports**: Single import for all Card-related components
- **New semantic components**: `Card.Title` and `Card.Description` for better
  structure
- **Reduced bundle size**: Tree-shakeable namespace exports
- **Same functionality**: All v2 features and props work identically in v3
