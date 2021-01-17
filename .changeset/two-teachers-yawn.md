---
"@chakra-ui/avatar": minor
"@chakra-ui/divider": minor
"@chakra-ui/docs": patch
"@chakra-ui/input": minor
"@chakra-ui/media-query": minor
"@chakra-ui/progress": minor
"@chakra-ui/select": minor
"@chakra-ui/slider": minor
"@chakra-ui/system": minor
"@chakra-ui/tabs": minor
---

`useStyleConfig` now accepts responsive values for `orientation`, `size` and
`value` props.

This means you can use responsive values for these props in all Chakra UI
components!

Examples:

```js
<Button variant={["outline", "link"]}>Button</Button>
<Input size={["xs", "sm", "lg"]} />
<Divider orientation={{ base: "horizontal", lg: "vertical"] }} />
```
