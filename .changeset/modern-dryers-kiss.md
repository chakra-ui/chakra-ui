---
"@chakra-ui/editable": minor
---

Added the component `EditableTextarea` to `Editable`. Use the textarea element
to handle multi line text input in an editable context.

```tsx live=false
<Editable defaultValue="Change me" onChange={console.log}>
  <EditablePreview />
  <EditableTextarea />
</Editable>
```
