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
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/core";

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
import { Button } from "@chakra-ui/core";

const App = () => <Button>I just consumed some ⚡️Chakra!</Button>;
```

# Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.

The components to be built come the
[Aria Practices Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1).

Here is a table of the components and their status.

✅ - Released<br/> ⚠️ - Released but buggy<br/> 🛠 - Planning to Build<br/> ❓ -
Might Build?

| Status | Name                 |
| ------ | -------------------- |
| ✅      | Accordion            |
| ✅      | Alert                |
| ✅      | Alert Dialog         |
| ✅      | Breadcrumb           |
| ✅      | Button               |
| ✅      | Box                  |
| ✅      | Checkbox             |
| 🛠     | Combo Box            |
| ✅      | Dialog (Modal)       |
| 🛠     | Disclosure           |
| ❓      | Feed                 |
| ✅      | Link                 |
| 🛠     | Listbox              |
| 🛠     | Menu or Menu bar     |
| ✅      | Menu Button          |
| ✅      | Popover              |
| ✅      | Pseudo Box           |
| ✅      | Radio Group          |
| ✅      | Slider               |
| 🛠     | Slider (Multi-Thumb) |
| ❓      | Table                |
| ✅      | Tabs                 |
| ❓      | Toolbar              |
| ✅      | Tooltip              |
| 🛠     | Tree View            |
| ❓      | Treegrid             |
| ❓      | Window Splitter      |
