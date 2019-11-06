<br />

<p align="center">
  <a href="https://github.com/reakit/reakit/tree/master/logo">
    <img src="https://github.com/chakra-ui/chakra-ui/blob/master/logo/logo-colored@2x.png?raw=true" alt="Reakit symbol" width="300" />
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
  <img alt="Spectrum" src="https://badgen.net/github/last-commit/chakra-ui/chakra-ui" />
  <img alt="Spectrum" src="https://badgen.net/github/stars/chakra-ui/chakra-ui" />
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

By donating \$5 or more you can support the ongoing development of this project. We'll appreciate some support. Thank you to all our supporters! 🙏 [[Contribute](https://opencollective.com/chakra-ui/contribute)]

#### Individuals

<a href="https://opencollective.com/chakra-ui"><img src="https://opencollective.com/chakra-ui/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/chakra-ui/contribute)]

<a href="https://opencollective.com/chakra-ui/organization/0/website"><img src="https://opencollective.com/chakra-ui/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/1/website"><img src="https://opencollective.com/chakra-ui/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/2/website"><img src="https://opencollective.com/chakra-ui/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/3/website"><img src="https://opencollective.com/chakra-ui/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/4/website"><img src="https://opencollective.com/chakra-ui/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/5/website"><img src="https://opencollective.com/chakra-ui/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/6/website"><img src="https://opencollective.com/chakra-ui/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/7/website"><img src="https://opencollective.com/chakra-ui/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/8/website"><img src="https://opencollective.com/chakra-ui/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/chakra-ui/organization/9/website"><img src="https://opencollective.com/chakra-ui/organization/9/avatar.svg"></a>


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
import { Button } from "@chakra-ui/core";

<Button>I just consumed some ⚡️Chakra!</Button>;
```

## CodeSandbox

- JavaScript: https://codesandbox.io/s/chakra-js-starter-lzzg9
- Typescript: https://codesandbox.io/s/chakra-ts-starter-pomi8


## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].

<a href="https://github.com/chakra-ui/chakra-ui/graphs/contributors"><img src="https://opencollective.com/chakra-ui/contributors.svg?width=890&button=false" /></a>
