# gatsby-plugin-chakra-ui

Gatsby plugin for adding Chakra UI

## Installation

⚡ To use Chakra UI in your Gatsby site, you need to install the plugin and its
peer dependencies.

```sh
npm i gatsby-plugin-chakra-ui @chakra-ui/core

# or

yarn add gatsby-plugin-chakra-ui @chakra-ui/core
```

## Usage

1. Add `gatsby-plugin-chakra-ui` as a plugin in your Gatsby config.

```js
// gatsby-config.js
module.exports = {
  plugins: ["gatsby-plugin-chakra-ui"],
}
```

2. Use Chakra ⚡

```jsx
// src/pages/index.js
import React from "react"
import { Box, Text } from "@chakra-ui/core"

function IndexPage() {
  return (
    <Box p={8}>
      <Text fontSize="xl">Hello World</Text>
    </Box>
  )
}

export default IndexPage
```

## Plugin options

By default, this plugin adds a couple of context providers to make all
components work correctly.

- **ThemeProvider:** To provide the theme context to all components.
- **ColorModeProvider:** To provide the current preferred color mode stored in
  `localStorage`
- **GlobalStyles:** To add global styles defined in `theme.styles.global`
- **CSSReset:** To add browser reset styles
- **PortalManager:** To manage portals used by modal, popover, etc

```jsx
<ThemeProvider theme={theme}>
  <ColorModeProvider>
    <GlobalStyle />
    {isResettingCSS && <CSSReset />}
    <PortalManager zIndex={portalZIndex}>{element}</PortalManager>
  </ColorModeProvider>
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
         * if `false`, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if `false`, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
        /**
         * @property {number} [portalZIndex=40]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: 40,
      },
    },
  ],
}
```

## Customizing the theme

To use customize the theme in your Gatsby site, you can shadow the plugin's
`src/gatsby-plugin-chakra-ui/index.js` file with your own theme:

```js
// src/gatsby-plugin-chakra-ui/theme.js
const theme = {}

export default theme
```

You can learn more about custom theme at
[Chakra UI's documentation](https://chakra-ui.com/theme).

By default, Chakra provides a sensible
[default theme](https://github.com/chakra-ui/chakra-ui/tree/develop/packages/theme)
inspired by Tailwind CSS.
