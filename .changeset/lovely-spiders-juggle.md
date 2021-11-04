---
"@chakra-ui/accordion": minor
"@chakra-ui/alert": minor
"@chakra-ui/anatomy": minor
"@chakra-ui/avatar": minor
"@chakra-ui/breadcrumb": minor
"@chakra-ui/button": minor
"@chakra-ui/checkbox": minor
"@chakra-ui/clickable": minor
"@chakra-ui/close-button": minor
"@chakra-ui/color-mode": minor
"@chakra-ui/control-box": minor
"@chakra-ui/counter": minor
"@chakra-ui/css-reset": minor
"@chakra-ui/descendant": minor
"@chakra-ui/editable": minor
"@chakra-ui/react-env": minor
"@chakra-ui/focus-lock": minor
"@chakra-ui/form-control": minor
"@chakra-ui/hooks": minor
"@chakra-ui/icon": minor
"@chakra-ui/icons": minor
"@chakra-ui/image": minor
"@chakra-ui/input": minor
"@chakra-ui/layout": minor
"@chakra-ui/live-region": minor
"@chakra-ui/media-query": minor
"@chakra-ui/menu": minor
"@chakra-ui/modal": minor
"@chakra-ui/number-input": minor
"@chakra-ui/pin-input": minor
"@chakra-ui/popover": minor
"@chakra-ui/popper": minor
"@chakra-ui/portal": minor
"@chakra-ui/progress": minor
"@chakra-ui/provider": minor
"@chakra-ui/radio": minor
"@chakra-ui/react": minor
"@chakra-ui/react-utils": minor
"@chakra-ui/select": minor
"@chakra-ui/skeleton": minor
"@chakra-ui/skip-nav": minor
"@chakra-ui/slider": minor
"@chakra-ui/spinner": minor
"@chakra-ui/stat": minor
"@chakra-ui/styled-system": minor
"@chakra-ui/switch": minor
"@chakra-ui/system": minor
"@chakra-ui/table": minor
"@chakra-ui/tabs": minor
"@chakra-ui/tag": minor
"@chakra-ui/test-utils": minor
"@chakra-ui/textarea": minor
"@chakra-ui/theme": minor
"@chakra-ui/theme-tools": minor
"@chakra-ui/toast": minor
"@chakra-ui/tooltip": minor
"@chakra-ui/transition": minor
"@chakra-ui/utils": minor
"@chakra-ui/visually-hidden": minor
---

Update build system we use from a custom babel cli setup to
[preconstruct](https://preconstruct.tools/).

The previous build system transpiles the code in `src` directory to `dist/esm`
and `dist/cjs` keeping the same file structure. The new build system merges all
files in `src` and transpiles to a single `esm` and `cjs` file.

**Potential Breaking Change:** The side effect of this is that, if you imported
any function, component or hook using the **undocumented** approach like
`import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"`,
you'll notice that the this doesn't work anymore.

Here's how to resolve it:

```jsx
// Won't work 🎇
import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"

// Works ✅
import { useOutsideClick } from "@chakra-ui/hooks"
```

If this affected your project, we recommend that you import hooks, functions or
components the way it's shown in the documentation. This will help keep your
project future-proof.
