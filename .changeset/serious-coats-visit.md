---
"@chakra-ui/react": minor
---

- Icon: Set `asChild` to `true` by default to reduce repetition

- All components

  - Ensure consistent sizing convention (units of 4px). Smaller elements start
    at 20px, larger elements start at 40px
  - Ensure focus ring matches the colorPalette

- Input, Textarea: Rename `filled` variant to `subtle`

- Tags: Add new `Tag.StartElement` and `Tag.EndElement` components to allow for
  easier styling of the start and end elements
