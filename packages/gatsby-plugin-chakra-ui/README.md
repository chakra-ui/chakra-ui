# gatsby-plugin-chakra-ui

Drop-in Chakra UI support for Gatsby sites

## Installation

⚡ To use Chakra UI in your Gatsby site, you need to install the plugin and its
peer dependencies.

```
$ yarn add gatsby-plugin-chakra-ui @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

## Usage

### Basic

1. Add `gatsby-plugin-chakra-ui` as a plugin in your Gatsby config.

```js
// gatsby-config.js
module.exports = {
  plugins: ["gatsby-plugin-chakra-ui"],
};
```

2. Use Chakra ⚡

```jsx
// src/pages/index.js
import React from "react";
import { Box, Text } from "@chakra-ui/core";

function IndexPage() {
  return (
    <Box p={8}>
      <Text fontSize="xl">Hello World</Text>
    </Box>
  );
}

export default IndexPage;
```

### Gatsby plugin options

By default, this plugin makes use of Chakra CSS reset component and color mode
context:

```jsx
<ThemeProvider theme={theme}>
  <CSSReset />
  <ColorModeProvider>{element}</ColorModeProvider>
</ThemeProvider>
```

You can disable either of these with Gatsby options:

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
  ],
};
```

### Custom theme

To use custom theme, you can shadow this plugin's `theme.js` file with your own
theme:

```js
// src/gatsby-plugin-chakra-ui/theme.js
const theme = {};

export default theme;
```

You can learn more about custom theme at
[Chakra UI's documentation](https://chakra-ui.com/theme).

By default, Chakra provides a sensible
[default theme](https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui/src/theme)
inspired by Tailwind CSS.
