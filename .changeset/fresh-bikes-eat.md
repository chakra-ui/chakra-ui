---
"@chakra-ui/react": minor
---

Add new `TagsInput` component for entering multiple values as tags with features
like tag creation, deletion, and keyboard navigation.

```tsx
import { Span, TagsInput } from "@chakra-ui/react"

export const TagsInputBasic = () => {
  return (
    <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
      <TagsInput.Label>Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add tag..." />
      </TagsInput.Control>
    </TagsInput.Root>
  )
}
```
