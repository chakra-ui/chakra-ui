---
"@chakra-ui/color-mode": major
---

The `LightMode` and `DarkMode` components are now able to toggle semantic tokens
as well.

For backward compatibility reasons this needs to be enabled by passing the
boolean prop `withSemanticTokens`.

```tsx live=false
<DarkMode withSemanticTokens>
  <chakra.div color="your-semantic-token">
    This uses always the _dark value of your semantic token
  </chakra.div>
</DarkMode>
```

Please note that by adding the prop `withSemanticTokens` the ColorMode
components will render a DOM element which accepts style props as usual.

```tsx
<DarkMode withSemanticTokens p="4" flex="1">
  ...
</DarkMode>
```
