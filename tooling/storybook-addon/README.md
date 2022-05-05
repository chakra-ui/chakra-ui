# @chakra-ui/storybook-addon

Use Chakra UI in your Storybook stories.

This Plugin wraps each of your stories with [`ChakraProvider`][chakraprovider]
which can be configured using Storybook parameters.

## Installation

### yarn

```sh
yarn add -D @chakra-ui/storybook-addon
```

### npm

```sh
npm i -D @chakra-ui/storybook-addon
```

Add the addon to your configuration in `.storybook/main.js` and disable the
emotion alias (available with Storybook >6.4).

```js
module.exports = {
  addons: ["@chakra-ui/storybook-addon"],
  features: {
    emotionAlias: false,
  },
}
```

## Configuring `ChakraProvider`

If you need to customize the props passed to `ChakraProvider` for your stories
(to use a custom `theme`, for example), you'll need to create custom Storybook
parameters.

To set global parameters for this addon, add a `chakra` object to the
`parameters` export in `.storybook/preview.js`:

```js
import myTheme from "../theme"

export const parameters = {
  chakra: {
    theme: myTheme,
  },
}
```

The `chakra` parameters take the same shape as the `props` for `ChakraProvider`.
[See the `ChakraProvider` props table][chakraprovider] to see the list of
possible parameters.

### Overriding `ChakraProvider` configuration for individual components or stories

Storybook allows you to define parameters at multiple levels: global, component,
and story. We recommend setting default parameters at the global level, and
overriding them at the component or story when necessary. See the
[Storybook Parameters documentation](https://storybook.js.org/docs/react/writing-stories/parameters)
for more information.

## Color Mode Tool

You will be able to toggle your color mode with the button in the toolbar. It
tries to sync with your theme through the localstorage key.

## Story Controls for Theme Components

Get controls for the theming props `variant`, `size` and `colorScheme` in your
stories with `getThemingArgTypes(theme, componentName)`.

```tsx
import { Meta, StoryFn } from "@storybook/react"
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { theme } from "<your-theme>"

export default {
  title: "Components / Forms / Button",
  // get controls for `variant`, `size` and `colorScheme`
  argTypes: getThemingArgTypes(theme, "Button"),
} as Meta

interface StoryProps extends ThemingProps<"Button"> {}

export const Basic: StoryFn<StoryProps> = (props) => (
  <Button {...props}>Button</Button>
)
```

This will render input fields to choose the theming prop values:

![Storybook screenshot with controls tab](theming-arg-types.png)

[chakraprovider]:
  https://chakra-ui.com/docs/getting-started#chakraprovider-props
