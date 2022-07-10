---
"@chakra-ui/layout": minor
---

Add new highlight text component to emphasize any part of a string with the
`mark` tag.

```jsx live=false
<Text fontWeight="semibold">
  <Highlight
    query={"with speed"}
    styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
  >
    Create accessible React apps with speed
  </Highlight>
</Text>
```
