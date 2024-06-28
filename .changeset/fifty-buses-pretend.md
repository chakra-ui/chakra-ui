---
"@chakra-ui/react": minor
---

Add support for built-in layer styles to help prototype faster with automatic
dark mode. Paired with `colorPalette`, you can create beautiful designs with
little code that adapts to dark mode automatically.

**Fill Layer Styles:** `fill.subtle`, `fill.solid`, `fill.surface`

```jsx
<Box layerStyle="fill.subtle" colorPalette="red">
  This is a subtle fill layer
</Box>
```

**Border Layer Styles:** `outline.subtle`, `outline.solid`

```jsx
<Box layerStyle="outline.subtle" colorPalette="red">
  This is a subtle outline layer
</Box>
```

**Ghost:** `ghost.subtle`, `ghost.solid`

```jsx
<Box layerStyle="ghost.subtle" colorPalette="red">
  This is a subtle ghost layer
</Box>
```

**Indicator Styles**: `indicator.top`, `indicator.end`, `indicator.bottom`,
`indicator.start`

```jsx
<Box layerStyle="indicator.top" colorPalette="red">
  This is a top indicator layer
</Box>
```

**Disabled Styles:** `disabled`

```jsx
<Box _disabled={{ layerStyle: "disabled" }}>Disabled Button</Box>
```

You can combine these layer styles to create very complex designs with little
code.

```jsx
<Box
  layerStyle="fill.subtle"
  _hover={{ layerStyle: "outline.solid" }}
  colorPalette="red"
>
  This is a complex layer
</Box>
```
