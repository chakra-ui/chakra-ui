---
"@chakra-ui/styled-system": minor
"@chakra-ui/system": minor
"@chakra-ui/theme": minor
"@chakra-ui/theme-tools": minor
"@chakra-ui/toast": minor
"@chakra-ui/utils": minor
---

The `system` now supports responsive values for `size` and `variant` props. This
means you can now use responsive values for this props in any component:

```ts
<Button
  variant={["solid", null, null, "outline"]}
  size={["xs", null, null, "md"]}
>
  Responsive Variants and Sizes!
</Button>
```
