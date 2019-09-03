# **Welcome to Chakra UI ⚡️**

- Works out of the box. Chakra UI contains a set of polished React components
  that work out of the box.

- Flexible & composable. Chakra UI components are built on top of a React UI
  Primitive for endless composability.

- Accessible. Chakra UI components follows the WAI-ARIA guidelines
  specifications.

- Dark Mode 😍: All components are dark mode compatible.

# Installing Chakra UI

⚡️Chakra UI is made up of multiple components and tools which you can import
one by one. All you need to do is install the `chakra-ui` package:

```sh
$ yarn add chakra-ui
# or
$ npm install --save chakra-ui
```

# Getting set up

To start using the components, please follow these steps:

1. Wrap your application in a `ThemeProvider` provded by **chakra-ui**

```jsx
import { ThemeProvider, ColorModeProvider } from "fannypack";

const App = () => (
  <ThemeProvider>
    <ColorModeProvider>{/* Your app */}</ColorModeProvider>
  </ThemeProvider>
);
```

`ColorModeProvider` is a context that provides light mode and dark mode values
to the components. It also comes with a function to toggle between light/dark
mode.

2. Now you can start using components like so!:

```jsx
import { Button } from "chakra-ui";

const App = () => <Button>I just consumed some ⚡️Chakra!</Button>;
```

# Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.


