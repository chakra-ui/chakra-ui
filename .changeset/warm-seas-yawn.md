---
"@chakra-ui/layout": minor
---

Add new highlight text component to emphasize any part of a string with the
`mark` tag.

```jsx live=false
<Text fontWeight="semibold">
  <Highlight
    query={["$48 per year ($4 per month)", "$5 per month", "free"]}
    styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
  >
    Cleanup.Picture is free unless you need better quality and process
    hi-resolution images. The price is then $5 per month or $48 per year ($4 per
    month) for processing images of any size.
  </Highlight>
</Text>
```
