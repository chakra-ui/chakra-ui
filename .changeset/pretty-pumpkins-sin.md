---
"@chakra-ui/gatsby-plugin": patch
---

Reverts the use of the `baseTheme` in the plugin

With the added features of `extendBaseTheme` and `ChakraBaseProvider`, it was
determined that the provider is considered unnecessary.

> Custom theming is to be expected for components when there are no defaults
> rendered.

For Gatsby, this means that the plugin can be reverted back to it's original
setup, and still be able to accept `extendBaseTheme` to reduce the payload of
the component themes when customizing them.
