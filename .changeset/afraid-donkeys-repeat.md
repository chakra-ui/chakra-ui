---
"@chakra-ui/styled-system": minor
---

Add support for css media query and dark class selectors.

- Users can now define write styles for dark class variant

```jsx live=false
<body className="dark">
  <Box bg="red.200" _dark={{ bg: "red.300" }}>
    This will be styled based on dark mode class in body
  </Box>
</body>
```

- Users can also define write styles for CSS media dark mode

```jsx live=false
<Box bg="red.200" _mediaDark={{ bg: "red.300" }}>
  This will be styled based on System preference
</Box>
```

**Note to maintainers**

> This is an initial effort to move towards using CSS instead of JS for
> color-mode styles.
>
> In Chakra v2, we'll only use JS to detect the initial color mode and rely on
> `_dark` for changing styles.
