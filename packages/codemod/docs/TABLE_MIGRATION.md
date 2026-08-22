# Table Migration Guide

This document outlines the migration of Table-related components from Chakra UI
v2 to v3.

## Component Mapping

### v2 → v3

| v2 Component     | v3 Component         |
| ---------------- | -------------------- |
| `Table`          | `Table.Root`         |
| `Thead`          | `Table.Header`       |
| `Tbody`          | `Table.Body`         |
| `Tfoot`          | `Table.Footer`       |
| `Tr`             | `Table.Row`          |
| `Th`             | `Table.ColumnHeader` |
| `Td`             | `Table.Cell`         |
| `TableCaption`   | `Table.Caption`      |
| `TableContainer` | `Table.ScrollArea`   |

## Import Changes

**v2:**

```tsx
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"
```

## Prop Changes

### Table.ColumnHeader & Table.Cell

| v2 Prop     | v3 Prop           | Notes                           |
| ----------- | ----------------- | ------------------------------- |
| `isNumeric` | `textAlign="end"` | Replaced with direct style prop |

## Usage Examples

### Basic Table

**v2:**

```tsx
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

;<Table>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Age</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>John Doe</Td>
      <Td>30</Td>
    </Tr>
  </Tbody>
</Table>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Name</Table.ColumnHeader>
      <Table.ColumnHeader>Age</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>30</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Table with Caption

**v2:**

```tsx
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

;<Table>
  <TableCaption>Sales Report</TableCaption>
  <Thead>
    <Tr>
      <Th>Product</Th>
      <Th>Sales</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Widget</Td>
      <Td>100</Td>
    </Tr>
  </Tbody>
</Table>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.Root>
  <Table.Caption>Sales Report</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Product</Table.ColumnHeader>
      <Table.ColumnHeader>Sales</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Widget</Table.Cell>
      <Table.Cell>100</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Table with Footer

**v2:**

```tsx
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"

;<Table>
  <Thead>
    <Tr>
      <Th>Product</Th>
      <Th>Quantity</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Item 1</Td>
      <Td>10</Td>
    </Tr>
  </Tbody>
  <Tfoot>
    <Tr>
      <Th>Total</Th>
      <Th>10</Th>
    </Tr>
  </Tfoot>
</Table>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Product</Table.ColumnHeader>
      <Table.ColumnHeader>Quantity</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Item 1</Table.Cell>
      <Table.Cell>10</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.ColumnHeader>Total</Table.ColumnHeader>
      <Table.ColumnHeader>10</Table.ColumnHeader>
    </Table.Row>
  </Table.Footer>
</Table.Root>
```

### Numeric Columns

**v2:**

```tsx
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

;<Table>
  <Thead>
    <Tr>
      <Th>Product</Th>
      <Th isNumeric>Price</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Widget</Td>
      <Td isNumeric>$50</Td>
    </Tr>
  </Tbody>
</Table>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Product</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Widget</Table.Cell>
      <Table.Cell textAlign="end">$50</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Scrollable Table

**v2:**

```tsx
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

;<TableContainer>
  <Table>
    <Thead>
      <Tr>
        <Th>Column 1</Th>
        <Th>Column 2</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Data 1</Td>
        <Td>Data 2</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.ScrollArea>
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Column 1</Table.ColumnHeader>
        <Table.ColumnHeader>Column 2</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Data 1</Table.Cell>
        <Table.Cell>Data 2</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
</Table.ScrollArea>
```

### Table with Variants

**v2:**

```tsx
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

;<Table variant="striped" colorScheme="teal">
  <Thead>
    <Tr>
      <Th>Name</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>John</Td>
    </Tr>
  </Tbody>
</Table>
```

**v3:**

```tsx
import { Table } from "@chakra-ui/react"

;<Table.Root variant="striped" colorScheme="teal">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Name</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

## Running the Codemod

To automatically migrate your Table components, run:

```bash
npx @chakra-ui/codemod transform table <path>
```

### Example

```bash
# Transform all files in src directory
npx @chakra-ui/codemod transform table ./src

# Dry run to preview changes
npx @chakra-ui/codemod transform table ./src --dry
```

## Manual Migration Steps

If you prefer to migrate manually:

1. **Import Changes**: Import only `Table` from '@chakra-ui/react'
2. **Component Renames**:
   - `Table` → `Table.Root`
   - `Thead` → `Table.Header`
   - `Tbody` → `Table.Body`
   - `Tfoot` → `Table.Footer`
   - `Tr` → `Table.Row`
   - `Th` → `Table.ColumnHeader`
   - `Td` → `Table.Cell`
   - `TableCaption` → `Table.Caption`
   - `TableContainer` → `Table.ScrollArea`
3. **Prop Changes**:
   - Replace `isNumeric` with `textAlign="end"`

## Breaking Changes

### Component Structure

- All table components are now compound components under the `Table` namespace
- Single import instead of multiple component imports

### Prop Changes

- `isNumeric` prop replaced with direct `textAlign="end"` style prop

## Benefits

The v3 Table provides:

- **Simpler Imports**: Single import for all table components
- **Better Organization**: Compound component pattern groups related components
- **Clearer Semantics**: More descriptive component names (e.g., `ColumnHeader`
  instead of `Th`)
- **Direct Styling**: `textAlign` prop instead of abstract `isNumeric`
- **Same Functionality**: All table features work identically
