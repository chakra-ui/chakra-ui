---
"@chakra-ui/popover": patch
---

- Added support for overriding arrow background and box shadow via prop, and
  from theme.

  ```jsx live=false
  <PopoverArrow bg="red.500" boxShadow="lg" />
  ```

  ```jsx live=false
  const theme = extendTheme({
    components: {
      Popover: {
        variants: {
          solid: {
            arrow: {
              "--popper-arrow-bg": "colors.red.500",
              "--popper-arrow-shadow": "shadows.lg",
            },
          },
        },
      },
    },
  })
  ```
