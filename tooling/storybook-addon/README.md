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

## Usage

Add the addon to your configuration in `.storybook/main.js`:

```js
module.exports = {
  addons: ["@chakra-ui/storybook-addon"],
}
```

### Configuring `ChakraProvider`

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

## Color Mode Switch

You will be able to toggle your color mode with the button in the top right
corner as you can see below:

![dark-mode](https://user-images.githubusercontent.com/87735757/142751123-77a39f2f-9277-4b11-b030-8a879d4b909b.gif)

## Configuring Color Mode Switch

If you need to remove or change the switch's behavior you can pass the following
values:

### Example Usage

```js
//.storybook/preview.js
export const parameters = {
  chakra: {
    ...
    colorModeSwitch: { //default values
      enable: true,
      position: 'top-right',
      margin: '1rem',
      zIndex: 9999
    }
  }
}
```

All the parameters are **optional**.

| Parameter | Type             | Default       | Allowed values                                           | Description                                                                                                                                            |
| --------- | ---------------- | ------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enable    | boolean          | `true`        | `true\|false`                                            | Show or hide                                                                                                                                           |
| position  | string           | `'top-right'` | `'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'` | Change the position to a different corner                                                                                                              |
| zIndex    | number \| string | `9999`        | any valid value to Chakra `zIndex` Style System          | This property goes directly to the `zIndex` of the [Style Props](https://chakra-ui.com/docs/styled-system/features/style-props#position)               |
| margin    | number \| string | `1rem`        | any valid value to Chakra `position` Style System        | This property goes directly to `top\|right\|bottom\|left` of the [Style Props](https://chakra-ui.com/docs/styled-system/features/style-props#position) |

### Overriding [`ChakraProvider`][chakraprovider] and Color Mode Switch configuration for individual components or stories

Storybook allows you to define parameters at multiple levels: global, component,
and story. We recommend setting default parameters at the global level, and
overriding them at the component or story when necessary. See the
[Storybook Parameters documentation](https://storybook.js.org/docs/react/writing-stories/parameters)
for more information.

[chakraprovider]:
  https://chakra-ui.com/guides/getting-started/cra-guide#chakraprovider-props
