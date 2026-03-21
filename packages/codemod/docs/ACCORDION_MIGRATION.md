# Accordion Migration Guide (v2 → v3)

This guide shows how to migrate Chakra UI Accordion components from v2 to v3.

## Automated Transformations

The codemod automatically handles:

- ✅ `<Accordion>` → `<Accordion.Root>`
- ✅ `<AccordionItem>` → `<Accordion.Item>` with auto-generated `value` prop
- ✅ `<AccordionButton>` → `<Accordion.ItemTrigger>`
- ✅ `<AccordionIcon>` → `<Accordion.ItemIndicator>`
- ✅ `<AccordionPanel>` → `<Accordion.ItemContent>` + `<Accordion.ItemBody>`
- ✅ Props: `allowMultiple` → `multiple`, `allowToggle` → `collapsible`
- ✅ Props: `defaultIndex` → `defaultValue`, `index` → `value`
- ✅ Props: `onChange` → `onValueChange`

## Use Case 1: Basic Accordion

### v2 Code

```tsx
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"

function App() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
```

### v3 Code (After Codemod)

```tsx
import { Accordion, Box } from "@chakra-ui/react"

function App() {
  return (
    <Accordion.Root collapsible>
      <Accordion.Item value="item-0">
        <h2>
          <Accordion.ItemTrigger>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent>
          <Accordion.ItemBody pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="item-1">
        <h2>
          <Accordion.ItemTrigger>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
        </h2>
        <Accordion.ItemContent>
          <Accordion.ItemBody pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

## Use Case 2: Accordion with Render Props (Context Access)

### v2 Code

```tsx
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AddIcon,
  Box,
  MinusIcon,
} from "@chakra-ui/react"

function App() {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
```

### v3 Code - Option 1: Using `useAccordionItemContext` Hook

```tsx
import { Accordion, Box, useAccordionItemContext } from "@chakra-ui/react"
import { LuMinus, LuPlus } from "react-icons/lu"

function App() {
  return (
    <Accordion.Root multiple>
      <Accordion.Item value="item-0">
        <Accordion.ItemTrigger>
          <Box flex="1" textAlign="left">
            Section 1 title
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="item-1">
        <CustomItemContent />
      </Accordion.Item>
    </Accordion.Root>
  )
}

function CustomItemContent() {
  const { open } = useAccordionItemContext()

  return (
    <>
      <Accordion.ItemTrigger>
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        {open ? <LuMinus size={12} /> : <LuPlus size={12} />}
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </>
  )
}
```

### v3 Code - Option 2: Using `Accordion.ItemContext` Component

```tsx
import { Accordion, Box } from "@chakra-ui/react"
import { LuMinus, LuPlus } from "react-icons/lu"

function App() {
  return (
    <Accordion.Root multiple>
      <Accordion.Item value="item-0">
        <Accordion.ItemTrigger>
          <Box flex="1" textAlign="left">
            Section 1 title
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item value="item-1">
        <Accordion.ItemContext>
          {({ open }) => (
            <>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left">
                  Section 2 title
                </Box>
                {open ? <LuMinus size={12} /> : <LuPlus size={12} />}
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </>
          )}
        </Accordion.ItemContext>
      </Accordion.Item>
    </Accordion.Root>
  )
}
```

## Key Changes Summary

### Component Naming

- `Accordion` → `Accordion.Root`
- `AccordionItem` → `Accordion.Item`
- `AccordionButton` → `Accordion.ItemTrigger`
- `AccordionIcon` → `Accordion.ItemIndicator`
- `AccordionPanel` → `Accordion.ItemContent` + `Accordion.ItemBody`

### Required Props

- `Accordion.Item` now **requires** a `value` prop (string)
  - Use meaningful values like `"about"`, `"features"`, etc.
  - Or use index-based values: `item-0`, `item-1`, etc.

### Prop Changes

| v2                          | v3                                        |
| --------------------------- | ----------------------------------------- |
| `allowMultiple`             | `multiple`                                |
| `allowToggle`               | `collapsible`                             |
| `defaultIndex={0}`          | `defaultValue={["0"]}` (array of strings) |
| `index={1}`                 | `value={["1"]}` (array of strings)        |
| `onChange={(index) => ...}` | `onValueChange={({ value }) => ...}`      |

### Context Access

- v2: `{({ isExpanded }) => ...}` render prop on `AccordionItem`
- v3: Use `useAccordionItemContext()` hook or `Accordion.ItemContext` component
- Context shape changed: `isExpanded` → `open`

## Running the Codemod

```bash
npx @chakra-ui/codemod@latest --transform accordion src/**/*.tsx
```

## Manual Steps After Codemod

1. **Review auto-generated `value` props** - Replace `item-0`, `item-1` with
   meaningful IDs
2. **Update render props** - Convert to `useAccordionItemContext()` hook or
   `Accordion.ItemContext` component
3. **Test thoroughly** - Verify accordion behavior matches v2
4. **Update imports** - Remove unused imports (`AccordionButton`,
   `AccordionIcon`, etc.)

## Additional Resources

- [Accordion Component Docs](https://chakra-ui.com/docs/components/accordion)
- [Migration Guide](https://chakra-ui.com/docs/migration)
