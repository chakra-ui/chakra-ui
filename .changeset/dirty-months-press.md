---
"@chakra-ui/editable": patch
---

Fixed an issue where `Editable` couldn't be edited when its value was empty.

Previously, the clickable `span` rendered by the `EditableInput` matched the
width of the `Editable` value text, so when the value was empty it had no width.
The `span` element now matches the width of the `Editable` container so that it
always has a width.

To control the width of the `Editable` component, use its `width` or `maxWidth`
props:

```tsx
const EditableExample = () => (
  <div>
    {/* The width is always 500px. */}
    <Editable width="500px">
      <EditablePreview />
      <EditableInput />
    </Editable>

    {/* The width is at most 500px and will shrink on smaller screens. */}
    <Editable maxWidth="500px">
      <EditablePreview />
      <EditableInput />
    </Editable>
  </div>
)
```
