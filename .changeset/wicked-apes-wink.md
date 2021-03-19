---
"@chakra-ui/theme": patch
---

- Added typings for the `theme` prop in `ThemingPropsThunk` and export a
  standalone type `ThemeComponentProps`

  ```ts
  import { ThemeComponentProps } from "@chakra-ui/react"

  function baseStyle(props: ThemeComponentProps) {
    return {
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.05) ${props.theme.colors.whiteAlpha[500]}`,
    }
  }
  ```
