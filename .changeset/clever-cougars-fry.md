---
"@chakra-ui/react": patch
"@chakra-ui/theme": patch
"@chakra-ui/theme-utils": patch
---

Add `ChakraBaseProvider`, a minimal version of `ChakraProvider` that supplies just the theme tokens, and ignores components.

Historically, one of the biggest causes of the large initial JS payload is the size of the components in the theme. With this new approach,
you get to apply the theme for just the component you need.

> Base theme refers to the minimal theme for just the design tokens

```jsx live=false
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import { buttonTheme } from "@chakra-ui/theme/components";

const theme = extendBaseTheme({
  components: {
    Button: buttonTheme,
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraBaseProvider>
  );
}
```
