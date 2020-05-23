<br />
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui">
    <img src="https://github.com/chakra-ui/chakra-ui/blob/master/logo/logo-colored@2x.png?raw=true" alt="Chakra logo" width="300" />
  </a>
</p>

<h1 align="center">Build Accessible React Apps with Speed ⚡️</h1>

<br>

<p align="center">
  <img alt="All Contributors" src="https://img.shields.io/github/contributors/chakra-ui/chakra-ui"/>
  <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@chakra-ui/core"/>
  <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/chakra-ui"/>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@chakra-ui/core.svg?style=flat"/>
  <a href="https://spectrum.chat/chakra-ui"><img alt="Spectrum" src="https://img.shields.io/badge/community-spectrum-7A2DFB.svg?style=flat-square" /></a>
  <img alt="Spectrum" src="https://badgen.net/github/stars/chakra-ui/chakra-ui" />
  <a href="https://lernajs.io/"><img alt="Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" /></a>
</p>
<br />

Chakra UI provides a set of accessible, reusable and composable React components
that make it super easy to create websites and apps.

## Looking for the documentation?

Here over here => https://chakra-ui.com

## Features

- Ease of Styling: Chakra UI contains a set of layout components like `Box` and
  `Stack` that make it easy to style your components by passing props.
  [Learn more](https://chakra-ui.com/style-props)
- Flexible & composable: Chakra UI components are built on top of a React UI
  Primitive for endless composability.
- Accessible. Chakra UI components follows the WAI-ARIA guidelines
  specifications and have the right `aria-*` attributes.
- Dark Mode 😍: Most components in Chakra UI are dark mode compatible.

## Support Chakra UI 💖

By donating \$5 or more you can support the ongoing development of this project.
We'll appreciate some support! 🙏

- To support [Segun Adebayo](https://github.com/segunadebayo)'s work <br><br>
  <a href="https://www.patreon.com/bePatron?u=24162613" data-patreon-widget-type="become-patron-button"><img height="56px" src="https://cloakandmeeple.files.wordpress.com/2017/06/become_a_patron_button3x.png?w=610"/></a>

- To support the Chakra UI core team members and maintainers <br><br>
  <a href="https://opencollective.com/chakra-ui/donate" target="_blank">
  <img src="https://opencollective.com/chakra-ui/donate/button@2x.png?color=blue" width=300 />
  </a>

## Testimonials

> People throw React component libraries and design systems at me regularly.
> This might be the best one I've seen. The APIs are simple but composable and
> the accessibility on the couple components I looked is complete.
>
> Great work @thesegunadebayo, really inspiring work. –
> [Ryan Florence](https://twitter.com/ryanflorence/status/1169260008069947392)

> Awesome new open-source component library from @thesegunadebayo. Really
> impressive stuff! –
> [Colm Tuite](https://twitter.com/colmtuite/status/1169622886052782081)

> This is incredible work. Amazing job Segun! –
> [Lee Robinson](https://twitter.com/leeerob/status/1169330130361159682)

> Chakra UI is glorious! I love the consistent use of focus styling and the
> subtle animation –
> [Guillermo ▲](https://twitter.com/rauchg/status/1169632334389248000)

## Installing Chakra UI

To use Chakra UI components, all you need to do is install the `@chakra-ui/core`
package and its peer dependencies:

```sh
$ yarn add @chakra-ui/core @emotion/core @emotion/styled emotion-theming

# or

$ npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
```

## Usage

To start using the components, please follow these steps:

1. Wrap your application with the `ThemeProvider` provided by
   **@chakra-ui/core**. We recommend that you also add the `CSSReset` component
   to remove all browser styling.

```jsx
import { ThemeProvider, CSSReset } from "@chakra-ui/core".

// Do this at the root of your application
const App = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
);
```

Optionally, you can wrap your application with the `ColorModeProvider` so you
can toggle beween light and dark mode within your app.

2. Now you can start using components like so!:

```jsx
import { Button } from "@chakra-ui/core"
;<Button>I just consumed some ⚡️Chakra!</Button>
```

## CodeSandbox Templates

- JavaScript Starter: https://codesandbox.io/s/chakra-ui-javascript-lzzg9
- TypeScript Starter: https://codesandbox.io/s/chakra-ui-typescript-pomi8

## Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.

## Contributors ✨

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/segunadebayo"><img src="https://avatars2.githubusercontent.com/u/6916170?v=4" width="64px;" alt=""/><br /><sub><b>Segun Adebayo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Code">💻</a> <a href="#maintenance-segunadebayo" title="Maintenance">🚧</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Documentation">📖</a> <a href="#example-segunadebayo" title="Examples">💡</a> <a href="#design-segunadebayo" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/tioluwani94"><img src="https://avatars1.githubusercontent.com/u/11310046?v=4" width="64px;" alt=""/><br /><sub><b>Tioluwani Kolawole</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tioluwani94" title="Documentation">📖</a> <a href="#example-tioluwani94" title="Examples">💡</a> <a href="#maintenance-tioluwani94" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/devanshj"><img src="https://avatars0.githubusercontent.com/u/30295578?v=4" width="64px;" alt=""/><br /><sub><b>Devansh Jethmalani</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=devanshj" title="Code">💻</a></td>
    <td align="center"><a href="http://adrianaleixandre.com"><img src="https://avatars3.githubusercontent.com/u/920212?v=4" width="64px;" alt=""/><br /><sub><b>Adrian Aleixandre</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lee-reinhardt"><img src="https://avatars1.githubusercontent.com/u/980089?v=4" width="64px;" alt=""/><br /><sub><b>Lee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lee-reinhardt" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kripod"><img src="https://avatars3.githubusercontent.com/u/14854048?v=4" width="64px;" alt=""/><br /><sub><b>Kristóf Poduszló</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kripod" title="Code">💻</a> <a href="#ideas-kripod" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Akripod" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=kripod" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="64px;" alt=""/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=wKovacs64" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://estheragbaje.dev/"><img src="https://avatars3.githubusercontent.com/u/53586167?v=4" width="64px;" alt=""/><br /><sub><b>Folasade Agbaje</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=estheragbaje" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/segunadebayo"><img src="https://avatars2.githubusercontent.com/u/6916170?v=4" width="40px;" alt="Segun Adebayo"/><br /><sub><b>Segun Adebayo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Code">💻</a> <a href="#maintenance-segunadebayo" title="Maintenance">🚧</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Documentation">📖</a> <a href="#example-segunadebayo" title="Examples">💡</a> <a href="#design-segunadebayo" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/tioluwani94"><img src="https://avatars1.githubusercontent.com/u/11310046?v=4" width="40px;" alt="Tioluwani Kolawole"/><br /><sub><b>Tioluwani Kolawole</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tioluwani94" title="Documentation">📖</a> <a href="#example-tioluwani94" title="Examples">💡</a> <a href="#maintenance-tioluwani94" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/devanshj"><img src="https://avatars0.githubusercontent.com/u/30295578?v=4" width="40px;" alt="Devansh Jethmalani"/><br /><sub><b>Devansh Jethmalani</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=devanshj" title="Code">💻</a></td>
    <td align="center"><a href="http://adrianaleixandre.com"><img src="https://avatars3.githubusercontent.com/u/920212?v=4" width="40px;" alt="Adrian Aleixandre"/><br /><sub><b>Adrian Aleixandre</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/lee-reinhardt"><img src="https://avatars1.githubusercontent.com/u/980089?v=4" width="40px;" alt="Lee"/><br /><sub><b>Lee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lee-reinhardt" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4" width="40px;" alt="Justin Hall"/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=wKovacs64" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

Testing Supported By<br/>
<img width="160" src="https://3fxtqy18kygf3on3bu39kh93-wpengine.netdna-ssl.com/wp-content/themes/browserstack/img/browserstack-logo.svg" alt="BrowserStack"/>

## LICENSE

MIT © [Segun Adebayo](https://github.com/segunadebayo)
