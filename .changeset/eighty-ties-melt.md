---
"@chakra-ui/styled-system": minor
---

- Add support for `textStyle` and `layerStyle` in styled-system package. This
  makes it possible to use them in the component theme, `css` function, and `sx`
  prop as well.

  ```jsx
  const theme = {
    textStyles: {
      caps: {
        fontWeight: "bold",
        fontSize: "24px",
      },
    },
  }

  const styles = css({ textStyle: "caps" })(theme)
  ```

  This also works for component theme as well.

  > `layerStyle`, `textStyle` and `apply` can now take responsive values as
  > well.

- Refactored `apply` prop handling to use the style config pattern instead of
  add it imperatively.
