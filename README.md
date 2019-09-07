# Welcome to Chakra UI ⚡️
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

- Works out of the box. Chakra UI contains a set of polished React components
  that work out of the box.

- Flexible & composable. Chakra UI components are built on top of a React UI
  Primitive for endless composability.

- Accessible. Chakra UI components follows the WAI-ARIA guidelines
  specifications.

- Dark Mode 😍: All components are dark mode compatible.

## Looking for the documentation?

https://chakra-ui.com


## Supporting Chakra UI 💖

Chakra UI is an MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of amazing contributors. If you're happy with Chakra UI and would like to support it's ongoing development, we'll appreciate some support.
- [Become a backer or sponsor on Patreon](https://www.patreon.com/segunadebayo).
- [Become a backer or sponsor on OpenCollective](https://opencollective.com/chakra-ui).


### What's the difference between Patreon and OpenCollective?

Funds donated via Patreon directly support [Segun Adebayo](https://github.com/segunadebayo)'s work on Chakra UI. Funds donated via OpenCollective are managed transparently and will be used for compensating work and expenses for core team members. Your name/logo will receive proper recognition and exposure by donating on either platform.

## Installing Chakra UI

⚡️Chakra UI is made up of multiple components and tools which you can import
one by one. All you need to do is install the `@chakra-ui/core` package and its peer dependencies:

```sh
$ yarn add @chakra-ui/core @emotion/core @emotion/styled emotion-theming
# or
$ npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

# Getting set up

To start using the components, please follow these steps:

1. Wrap your application in a `ThemeProvider` provided by **@chakra-ui/core**

```jsx
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/core";

const App = ({children}) => (
  <ThemeProvider>
    <ColorModeProvider>{children}</ColorModeProvider>
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

The components to be built come from the
[Aria Practices Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1).



## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/segunadebayo"><img src="https://avatars2.githubusercontent.com/u/6916170?v=4" width="40px;" alt="Segun Adebayo"/><br /><sub><b>Segun Adebayo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Code">💻</a> <a href="#maintenance-segunadebayo" title="Maintenance">🚧</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Documentation">📖</a> <a href="#example-segunadebayo" title="Examples">💡</a> <a href="#design-segunadebayo" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/tioluwani94"><img src="https://avatars1.githubusercontent.com/u/11310046?v=4" width="40px;" alt="Tioluwani Kolawole"/><br /><sub><b>Tioluwani Kolawole</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tioluwani94" title="Documentation">📖</a> <a href="#example-tioluwani94" title="Examples">💡</a> <a href="#maintenance-tioluwani94" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/devanshj"><img src="https://avatars0.githubusercontent.com/u/30295578?v=4" width="40px;" alt="Devansh Jethmalani"/><br /><sub><b>Devansh Jethmalani</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=devanshj" title="Code">💻</a></td>
    <td align="center"><a href="http://adrianaleixandre.com"><img src="https://avatars3.githubusercontent.com/u/920212?v=4" width="40px;" alt="Adrian Aleixandre"/><br /><sub><b>Adrian Aleixandre</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
