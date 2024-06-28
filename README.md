<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui">
    <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/logo-colored@2x.png?raw=true" alt="Chakra logo" width="300" />
  </a>
</p>

<h1 align="center">Build Accessible React Apps with Speed ⚡️</h1>
<br />

<p align="center">
  <img alt="Bundle Size" src="https://badgen.net/bundlephobia/minzip/@chakra-ui/react"/>
  <img alt="Github Checks" src="https://badgen.net/github/checks/chakra-ui/chakra-ui/main"/>
  <a href="https://github.com/chakra-ui/chakra-ui/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/chakra-ui/chakra-ui"/>
  </a>
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@chakra-ui/react.svg?style=flat"/>
  <img alt="Github Stars" src="https://badgen.net/github/stars/chakra-ui/chakra-ui" />
  <a href="https://discord.gg/chakra-ui">
    <img alt="Discord" src="https://img.shields.io/discord/660863154703695893.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" />
  </a>
</p>

<br />

Chakra UI is a comprehensive library of accessible, reusable, and composable
React components that streamlines the development of modern web applications and
websites. The library offers a diverse range of components that can be easily
combined to build complex user interfaces while adhering to accessibility best
practices.

## Table of contents

- 📋 [Documentation](#documentation)
- 🚀 [Features](#features)
- 📦 [Installation](#installation)
- 💻 [Usage](#usage)
- 📚 [CodeSandbox Templates](#codesandbox-templates)
- 📖 [`create-react-app` Templates](#create-react-app-templates)
- 📝 [Contributing](#contributing)
- 💖 [Support](#support-chakra-ui)
- 🙌 [Testimonials](#testimonials)
- 🏆 [Awards and Mentions](#awards-and-mentions)
- ✨ [Contributors](#contributors)
- ⚖️ [License](#license)

## Documentation

It's the https://chakra-ui.com website for the latest version of Chakra UI. For
older versions head over here

- v2: https://v2.chakra-ui.com
- v1: https://v1.chakra-ui.com
- v0: https://v0.chakra-ui.com

## Features

- Ease of Styling: Chakra UI contains a set of layout components like `Box` and
  `Stack` that make it easy to style your components by passing props.
  [Learn more](https://chakra-ui.com/style-props)
- Flexible & composable: Chakra UI components are built on top of a React UI
  Primitive for endless composability.
- Accessible. Chakra UI components follow the WAI-ARIA guidelines specifications
  and have the right `aria-*` attributes.
- Dark Mode 😍: Most components in Chakra UI are dark mode compatible.

## Installation

To use Chakra UI components, all you need to do is install the
`@chakra-ui/react` package and its peer dependencies:

```sh
# with Yarn
$ yarn add @chakra-ui/react @emotion/react

# with npm
$ npm i @chakra-ui/react @emotion/react

# with pnpm
$ pnpm add @chakra-ui/react @emotion/react

# with Bun
$ bun add @chakra-ui/react @emotion/react
```

## Usage

To start using the components, please follow these steps:

1. Wrap your application with the `ChakraProvider` provided by
   **@chakra-ui/react**.

```jsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

// Do this at the root of your application
function App({ children }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
```

Optionally, you can wrap your application with the `ColorModeProvider` so you
can toggle between light and dark mode within your app.

2. Now you can start using components like so!:

```jsx
import { Button } from "@chakra-ui/react"

function Example() {
  return <Button>I just consumed some ⚡️Chakra!</Button>
}
```

More guides on how to get started are available
[here](https://chakra-ui.com/getting-started)

## CodeSandbox Templates

- JavaScript Starter: https://codesandbox.io/s/chakra-ui-javascript-lzzg9
- TypeScript Starter: https://codesandbox.io/s/chakra-ui-typescript-pomi8
- NextJS TypeScript Starter:
  https://codesandbox.io/s/chakra-ui-next-js-typescript-kxvyr

## `create-react-app` Templates

[Check out our guide](https://chakra-ui.com/getting-started/cra-guide) for
information on how to use our official `create-react-app` templates.

## Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](./CONTRIBUTING.md) to help guide you.

Our docsite lives in a
[separate repo](https://github.com/chakra-ui/chakra-ui-docs). If you're
interested in contributing to the documentation, check out the
[docsite contribution guide](https://github.com/chakra-ui/chakra-ui-docs/blob/main/CONTRIBUTING.md).

## Support Chakra UI

### Organizations

Support this project with your organization. Your logo will show up here with a
link to your website.
[[Contribute](https://opencollective.com/chakra-ui/contribute)]

<a href="https://opencollective.com/chakra-ui/organization/0/website"><img src="https://opencollective.com/chakra-ui/organization/0/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/1/website"><img src="https://opencollective.com/chakra-ui/organization/1/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/2/website"><img src="https://opencollective.com/chakra-ui/organization/2/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/3/website"><img src="https://opencollective.com/chakra-ui/organization/3/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/4/website"><img src="https://opencollective.com/chakra-ui/organization/4/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/5/website"><img src="https://opencollective.com/chakra-ui/organization/5/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/6/website"><img src="https://opencollective.com/chakra-ui/organization/6/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/7/website"><img src="https://opencollective.com/chakra-ui/organization/7/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/8/website"><img src="https://opencollective.com/chakra-ui/organization/8/avatar.svg?avatarHeight=130" /></a>
<a href="https://opencollective.com/chakra-ui/organization/9/website"><img src="https://opencollective.com/chakra-ui/organization/9/avatar.svg?avatarHeight=130" /></a>

### Individuals

By donating \$5 or more you can support the ongoing development of this project.
We'll appreciate some support. Thank you to all our supporters! 🙏
[[Contribute](https://opencollective.com/chakra-ui/contribute)]

<a href="https://opencollective.com/chakra-ui"><img src="https://opencollective.com/chakra-ui/individuals.svg?width=890" /></a>

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

## Awards and Mentions

We've been extremely humbled to receive awards and mentions from the community
for all the innovation and reach Chakra UI brings to the JavaScript ecosystem.

<table>
  <tr valign="middle">
    <td width="124">
      <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/tech-radar.png" width="124" alt="Technology Radar" />
    </td>
    <td>
      <h4>Solution Worth Pursuing</h4>
      <p><em><a href="https://www.thoughtworks.com/radar/languages-and-frameworks/chakra-ui">Technology Radar</a> (2020–2021)</em></p>
    </td>
  </tr>
  <tr>
    <td width="124">
      <img src="https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/media/os-awards.png" width="124" alt="Open Source Awards 2020" />
    </td>
    <td>
      <h4>The Most Impactful Contribution to the community</h4>
      <p><em><a href="https://osawards.com/react/2020">Open Source Awards</a> (2020)</em></p>
    </td>
  </tr>
</table>

## Contributors

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/segunadebayo"><img src="https://avatars2.githubusercontent.com/u/6916170?v=4?s=64" width="64px;" alt="Segun Adebayo"/><br /><sub><b>Segun Adebayo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Code">💻</a> <a href="#maintenance-segunadebayo" title="Maintenance">🚧</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=segunadebayo" title="Documentation">📖</a> <a href="#example-segunadebayo" title="Examples">💡</a> <a href="#design-segunadebayo" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tioluwani94"><img src="https://avatars1.githubusercontent.com/u/11310046?v=4?s=64" width="64px;" alt="Tioluwani Kolawole"/><br /><sub><b>Tioluwani Kolawole</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tioluwani94" title="Documentation">📖</a> <a href="#example-tioluwani94" title="Examples">💡</a> <a href="#maintenance-tioluwani94" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/devanshj"><img src="https://avatars0.githubusercontent.com/u/30295578?v=4?s=64" width="64px;" alt="Devansh Jethmalani"/><br /><sub><b>Devansh Jethmalani</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=devanshj" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://adrianaleixandre.com"><img src="https://avatars3.githubusercontent.com/u/920212?v=4?s=64" width="64px;" alt="Adrian Aleixandre"/><br /><sub><b>Adrian Aleixandre</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vynlar" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lee-reinhardt"><img src="https://avatars1.githubusercontent.com/u/980089?v=4?s=64" width="64px;" alt="Lee"/><br /><sub><b>Lee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lee-reinhardt" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kripod"><img src="https://avatars3.githubusercontent.com/u/14854048?v=4?s=64" width="64px;" alt="Kristóf Poduszló"/><br /><sub><b>Kristóf Poduszló</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kripod" title="Code">💻</a> <a href="#ideas-kripod" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Akripod" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=kripod" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wKovacs64"><img src="https://avatars1.githubusercontent.com/u/1288694?v=4?s=64" width="64px;" alt="Justin Hall"/><br /><sub><b>Justin Hall</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=wKovacs64" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://chanchan.io"><img src="https://avatars1.githubusercontent.com/u/1954752?v=4?s=64" width="64px;" alt="Mark Chandler"/><br /><sub><b>Mark Chandler</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=with-heart" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=with-heart" title="Tests">⚠️</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=with-heart" title="Documentation">📖</a> <a href="#maintenance-with-heart" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://estheragbaje.dev/"><img src="https://avatars3.githubusercontent.com/u/53586167?v=4?s=64" width="64px;" alt="Folasade Agbaje"/><br /><sub><b>Folasade Agbaje</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=estheragbaje" title="Code">💻</a> <a href="#ideas-estheragbaje" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/christiannwamba"><img src="https://avatars2.githubusercontent.com/u/8108337?v=4?s=64" width="64px;" alt="Christian Nwamba"/><br /><sub><b>Christian Nwamba</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=christiannwamba" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/codebender828"><img src="https://avatars3.githubusercontent.com/u/21237954?s=60&v=4?s=64" width="64px;" alt="Jonathan Bakebwa"/><br /><sub><b>Jonathan Bakebwa</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=codebender828" title="Documentation">📖</a> <a href="#ideas-codebender828" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://alexluong.com"><img src="https://avatars1.githubusercontent.com/u/26750127?v=4?s=64" width="64px;" alt="Alex Luong"/><br /><sub><b>Alex Luong</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=alexluong" title="Code">💻</a> <a href="#plugin-alexluong" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.jescowuester.com"><img src="https://avatars3.githubusercontent.com/u/43379421?v=4?s=64" width="64px;" alt="Jesco Wüster"/><br /><sub><b>Jesco Wüster</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jescowuester" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/dusty"><img src="https://avatars2.githubusercontent.com/u/792?v=4?s=64" width="64px;" alt="Dusty Doris"/><br /><sub><b>Dusty Doris</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dusty" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/alex_lobera"><img src="https://avatars2.githubusercontent.com/u/1273037?v=4?s=64" width="64px;" alt="Alex Lobera"/><br /><sub><b>Alex Lobera</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=alexlbr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/remorses"><img src="https://avatars3.githubusercontent.com/u/31321188?v=4?s=64" width="64px;" alt="Tommaso De Rossi"/><br /><sub><b>Tommaso De Rossi</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=remorses" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mathdro.id/support"><img src="https://avatars2.githubusercontent.com/u/3748658?v=4?s=64" width="64px;" alt="Odi"/><br /><sub><b>Odi</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mathdroid" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hendrikniemann"><img src="https://avatars0.githubusercontent.com/u/7373078?v=4?s=64" width="64px;" alt="Hendrik Niemann"/><br /><sub><b>Hendrik Niemann</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=hendrikniemann" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mattrothenberg.com"><img src="https://avatars1.githubusercontent.com/u/5148596?v=4?s=64" width="64px;" alt="Matt Rothenberg"/><br /><sub><b>Matt Rothenberg</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mattrothenberg" title="Code">💻</a> <a href="#example-mattrothenberg" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://zaguini.me"><img src="https://avatars1.githubusercontent.com/u/26530524?v=4?s=64" width="64px;" alt="Luis Felipe Zaguini"/><br /><sub><b>Luis Felipe Zaguini</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=zaguiini" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jeanbauer"><img src="https://avatars2.githubusercontent.com/u/4689228?v=4?s=64" width="64px;" alt="Jean "/><br /><sub><b>Jean </b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jeanbauer" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/tayormi/"><img src="https://avatars2.githubusercontent.com/u/13835725?v=4?s=64" width="64px;" alt="Temitope Ajiboye"/><br /><sub><b>Temitope Ajiboye</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tayormi" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jkimbo.co.uk"><img src="https://avatars1.githubusercontent.com/u/691952?v=4?s=64" width="64px;" alt="Jonathan Kim"/><br /><sub><b>Jonathan Kim</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jkimbo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cjthompson"><img src="https://avatars3.githubusercontent.com/u/1958266?v=4?s=64" width="64px;" alt="Chris Thompson"/><br /><sub><b>Chris Thompson</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=cjthompson" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ipfsoftwares.com"><img src="https://avatars1.githubusercontent.com/u/8426172?v=4?s=64" width="64px;" alt="WALTER KIMARO"/><br /><sub><b>WALTER KIMARO</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jestrux" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jackleslie.dev"><img src="https://avatars2.githubusercontent.com/u/22222776?v=4?s=64" width="64px;" alt="Jack Leslie"/><br /><sub><b>Jack Leslie</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jackleslie" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://kendaganio.com"><img src="https://avatars2.githubusercontent.com/u/905891?v=4?s=64" width="64px;" alt="Ken-Lauren Daganio"/><br /><sub><b>Ken-Lauren Daganio</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kendaganio" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nomar.dev/"><img src="https://avatars0.githubusercontent.com/u/6010232?v=4?s=64" width="64px;" alt="Ramon"/><br /><sub><b>Ramon</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Rahmon" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://jessachandler.com"><img src="https://avatars3.githubusercontent.com/u/7316730?v=4?s=64" width="64px;" alt="jess"/><br /><sub><b>jess</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=monkeywithacupcake" title="Documentation">📖</a> <a href="#fundingFinding-monkeywithacupcake" title="Funding Finding">🔍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://fiveninedeveloper.000webhostapp.com"><img src="https://avatars2.githubusercontent.com/u/24798364?v=4?s=64" width="64px;" alt="Ayelegun Kayode Michael"/><br /><sub><b>Ayelegun Kayode Michael</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Billmike" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://talwilliams.com"><img src="https://avatars3.githubusercontent.com/u/76711?v=4?s=64" width="64px;" alt="Tal Williams"/><br /><sub><b>Tal Williams</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=xtalx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://trevorblades.com"><img src="https://avatars0.githubusercontent.com/u/1216917?v=4?s=64" width="64px;" alt="Trevor Blades"/><br /><sub><b>Trevor Blades</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=trevorblades" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=trevorblades" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Atrevorblades" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gordlea"><img src="https://avatars0.githubusercontent.com/u/782154?v=4?s=64" width="64px;" alt="Gord Lea"/><br /><sub><b>Gord Lea</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=gordlea" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://aggelos.dev"><img src="https://avatars1.githubusercontent.com/u/10436045?v=4?s=64" width="64px;" alt="Aggelos Arvanitakis"/><br /><sub><b>Aggelos Arvanitakis</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=3nvi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DouglasGabr"><img src="https://avatars2.githubusercontent.com/u/21958179?v=4?s=64" width="64px;" alt="Douglas Gabriel"/><br /><sub><b>Douglas Gabriel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=DouglasGabr" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Martinnord"><img src="https://avatars3.githubusercontent.com/u/17549362?v=4?s=64" width="64px;" alt="Martin Nordström"/><br /><sub><b>Martin Nordström</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Martinnord" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dannytatom"><img src="https://avatars2.githubusercontent.com/u/60604?v=4?s=64" width="64px;" alt="Danny Tatom"/><br /><sub><b>Danny Tatom</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dannytatom" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/simoncollins"><img src="https://avatars2.githubusercontent.com/u/874670?v=4?s=64" width="64px;" alt="Simon Collins"/><br /><sub><b>Simon Collins</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=simoncollins" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://santialbo.com"><img src="https://avatars3.githubusercontent.com/u/1557563?v=4?s=64" width="64px;" alt="Santi Albo"/><br /><sub><b>Santi Albo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=santialbo" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=santialbo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PILO7980"><img src="https://avatars0.githubusercontent.com/u/3218536?v=4?s=64" width="64px;" alt="PILO7980"/><br /><sub><b>PILO7980</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=PILO7980" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dowdiness"><img src="https://avatars3.githubusercontent.com/u/1616717?v=4?s=64" width="64px;" alt="Ishimoto Koji "/><br /><sub><b>Ishimoto Koji </b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dowdiness" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sinchang.me"><img src="https://avatars0.githubusercontent.com/u/3297859?v=4?s=64" width="64px;" alt="Jeff Wen"/><br /><sub><b>Jeff Wen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=sinchang" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://pablosz.tech"><img src="https://avatars3.githubusercontent.com/u/8672915?v=4?s=64" width="64px;" alt="Pablo Saez"/><br /><sub><b>Pablo Saez</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=PabloSzx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nejcr"><img src="https://avatars1.githubusercontent.com/u/17861648?v=4?s=64" width="64px;" alt="Nejc Ravnik"/><br /><sub><b>Nejc Ravnik</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=nejcr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mr-wildcard"><img src="https://avatars1.githubusercontent.com/u/6979207?v=4?s=64" width="64px;" alt="Julien Viala"/><br /><sub><b>Julien Viala</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mr-wildcard" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sebqq"><img src="https://avatars1.githubusercontent.com/u/33039909?v=4?s=64" width="64px;" alt="Sebastian Trebunak"/><br /><sub><b>Sebastian Trebunak</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=sebqq" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=sebqq" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sarcastron"><img src="https://avatars0.githubusercontent.com/u/2415228?v=4?s=64" width="64px;" alt="Adam Plante"/><br /><sub><b>Adam Plante</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=sarcastron" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/luciorubeens"><img src="https://avatars0.githubusercontent.com/u/4539235?v=4?s=64" width="64px;" alt="Lúcio Rubens"/><br /><sub><b>Lúcio Rubens</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=luciorubeens" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jasonmiazga.com"><img src="https://avatars2.githubusercontent.com/u/181441?v=4?s=64" width="64px;" alt="Jason Miazga"/><br /><sub><b>Jason Miazga</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jmiazga" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=jmiazga" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://gonzalopozzo.com"><img src="https://avatars1.githubusercontent.com/u/6494462?v=4?s=64" width="64px;" alt="Gonzalo Pozzo"/><br /><sub><b>Gonzalo Pozzo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=goncy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://cschroeter.net"><img src="https://avatars3.githubusercontent.com/u/1846056?v=4?s=64" width="64px;" alt="Christian"/><br /><sub><b>Christian</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=cschroeter" title="Code">💻</a> <a href="#infra-cschroeter" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Hagendorn"><img src="https://avatars3.githubusercontent.com/u/200940?v=4?s=64" width="64px;" alt="Christian Hagendorn"/><br /><sub><b>Christian Hagendorn</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Hagendorn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://doesntmeananything.com"><img src="https://avatars0.githubusercontent.com/u/34657799?v=4?s=64" width="64px;" alt="Andrey Krasnov"/><br /><sub><b>Andrey Krasnov</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Doesntmeananything" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dsds.io"><img src="https://avatars0.githubusercontent.com/u/410792?v=4?s=64" width="64px;" alt="Dony Sukardi"/><br /><sub><b>Dony Sukardi</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=donysukardi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/liokm"><img src="https://avatars0.githubusercontent.com/u/179341?v=4?s=64" width="64px;" alt="Meng"/><br /><sub><b>Meng</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=liokm" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gabelluardo"><img src="https://avatars1.githubusercontent.com/u/42920247?v=4?s=64" width="64px;" alt="Gabriele Belluardo"/><br /><sub><b>Gabriele Belluardo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=gabelluardo" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://francoisbest.com"><img src="https://avatars2.githubusercontent.com/u/1174092?v=4?s=64" width="64px;" alt="Francois Best"/><br /><sub><b>Francois Best</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=franky47" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tiancihe"><img src="https://avatars0.githubusercontent.com/u/36734012?v=4?s=64" width="64px;" alt="Tianci He"/><br /><sub><b>Tianci He</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tiancihe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/stevenambs"><img src="https://avatars1.githubusercontent.com/u/10133137?v=4?s=64" width="64px;" alt="Steven"/><br /><sub><b>Steven</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=stevenambs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://shinework.netlify.com"><img src="https://avatars3.githubusercontent.com/u/1102595?v=4?s=64" width="64px;" alt="Baptiste Adrien"/><br /><sub><b>Baptiste Adrien</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=shinework" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://robbevan.com"><img src="https://avatars1.githubusercontent.com/u/276?v=4?s=64" width="64px;" alt="Rob Bevan"/><br /><sub><b>Rob Bevan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=robbevan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pan-tom"><img src="https://avatars1.githubusercontent.com/u/27802923?v=4?s=64" width="64px;" alt="Tomasz"/><br /><sub><b>Tomasz</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=pan-tom" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://about.kkshyu.tw"><img src="https://avatars1.githubusercontent.com/u/8722165?v=4?s=64" width="64px;" alt="徐愷"/><br /><sub><b>徐愷</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kkshyu" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.trigo.dev"><img src="https://avatars1.githubusercontent.com/u/204445?v=4?s=64" width="64px;" alt="David Wippel"/><br /><sub><b>David Wippel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kelkes" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/catchspider2002"><img src="https://avatars3.githubusercontent.com/u/13168827?v=4?s=64" width="64px;" alt="Naveen"/><br /><sub><b>Naveen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=catchspider2002" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://vincenttunru.com"><img src="https://avatars1.githubusercontent.com/u/4251?v=4?s=64" width="64px;" alt="Vincent"/><br /><sub><b>Vincent</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Vinnl" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://aldoaiss.de"><img src="https://avatars1.githubusercontent.com/u/1507057?v=4?s=64" width="64px;" alt="Osamah Aldoaiss"/><br /><sub><b>Osamah Aldoaiss</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Saifadin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.fredkschott.com"><img src="https://avatars1.githubusercontent.com/u/622227?v=4?s=64" width="64px;" alt="Fred K. Schott"/><br /><sub><b>Fred K. Schott</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=FredKSchott" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jaredpalmer"><img src="https://avatars1.githubusercontent.com/u/4060187?s=60&v=4?s=64" width="64px;" alt="Jared Palmer"/><br /><sub><b>Jared Palmer</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jaredpalmer" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://walela.github.io"><img src="https://avatars3.githubusercontent.com/u/5380651?s=460&u=0e88e57ceb2a0f98d2ce737bb5a8f6f608a47697&v=4?s=64" width="64px;" alt="Austin Walela"/><br /><sub><b>Austin Walela</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=walela" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://tony@git-pull.com"><img src="https://avatars0.githubusercontent.com/u/26336?s=460&v=4?s=64" width="64px;" alt="Tony Narlock"/><br /><sub><b>Tony Narlock</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tony" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=tony" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://thomasmaximini.com"><img src="https://avatars2.githubusercontent.com/u/570544?s=460&u=0b020d3821581805b6ad6a187962b4e7081e9d77&v=4?s=64" width="64px;" alt="Thomas Maximini"/><br /><sub><b>Thomas Maximini</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tmaximini" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://davidbaumgold.com"><img src="https://avatars2.githubusercontent.com/u/132355?s=460&u=5198ecc5955dd4e576ff06a1a1b91a2cf201ddb6&v=4?s=64" width="64px;" alt="David Baumgold"/><br /><sub><b>David Baumgold</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=singingwolfboy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ralphilius"><img src="https://avatars3.githubusercontent.com/u/4253551?s=460&u=f641622c52c7830c12c9a5ef3c433ba68a6eb192&v=4?s=64" width="64px;" alt="ralphilius"/><br /><sub><b>ralphilius</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ralphilius" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.rahulrangnekar.com"><img src="https://avatars0.githubusercontent.com/u/13807007?s=460&u=e6f22e23c898fde5ee68203dbc0adb0267428c42&v=4?s=64" width="64px;" alt="Rahul Rangnekar"/><br /><sub><b>Rahul Rangnekar</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=rahrang" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://pierre.io"><img src="https://avatars0.githubusercontent.com/u/26219?s=460&v=4?s=64" width="64px;" alt="Pierre Nel"/><br /><sub><b>Pierre Nel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=pierrenel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://p.ier.re"><img src="https://avatars0.githubusercontent.com/u/1866496?s=460&u=464d14ef313ca52eb84024127e75afeb6a0ecf08&v=4?s=64" width="64px;" alt="Pierre Grimaud"/><br /><sub><b>Pierre Grimaud</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=pgrimaud" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://whisp.software"><img src="https://avatars2.githubusercontent.com/u/1201448?s=460&v=4?s=64" width="64px;" alt="Whisp R&D"/><br /><sub><b>Whisp R&D</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=orzarchi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kenna.xyz"><img src="https://avatars2.githubusercontent.com/u/32865577?s=460&u=a8d1696f5095b153948a3c8a3e5507b09fe9bceb&v=4?s=64" width="64px;" alt="Makenna Smutz"/><br /><sub><b>Makenna Smutz</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=KenzoBenzo" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=KenzoBenzo" title="Documentation">📖</a> <a href="#ideas-KenzoBenzo" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nelsonreitz.ch"><img src="https://avatars0.githubusercontent.com/u/10158587?s=460&u=26a000884c80c4f28fb6d08d5476561309062e77&v=4?s=64" width="64px;" alt="Nelson Reitz"/><br /><sub><b>Nelson Reitz</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=nelsonreitz" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nainardev"><img src="https://avatars2.githubusercontent.com/u/59839368?s=460&u=94aefbf6a1452b57c2bc1b103bab34acbe9244b7&v=4?s=64" width="64px;" alt="Mohamed Nainar"/><br /><sub><b>Mohamed Nainar</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=nainardev" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mustaphaturhan"><img src="https://avatars0.githubusercontent.com/u/11398393?s=460&u=1d915beadb5df52c00f667e08f8ecc65e4ee2e1e&v=4?s=64" width="64px;" alt="Mustafa Turhan"/><br /><sub><b>Mustafa Turhan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mustaphaturhan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://twitter.com/kimroen"><img src="https://avatars3.githubusercontent.com/u/520420?s=460&v=4?s=64" width="64px;" alt="Kim Røen"/><br /><sub><b>Kim Røen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kimroen" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jmakGH"><img src="https://avatars0.githubusercontent.com/u/3829337?s=460&u=3babbb571f358a4a419bd4ca4927dd53ff2d380e&v=4?s=64" width="64px;" alt="Justin Mak"/><br /><sub><b>Justin Mak</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jmakGH" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="www.twitter.com/jeremydavis"><img src="https://avatars0.githubusercontent.com/u/297572?s=460&v=4?s=64" width="64px;" alt="Jeremy Davis"/><br /><sub><b>Jeremy Davis</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jeremyadavis" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jatwork"><img src="https://avatars0.githubusercontent.com/u/11546793?s=460&u=8987e6cf833d07800cc372fa66444851744fe255&v=4?s=64" width="64px;" alt="Jeremy Lu"/><br /><sub><b>Jeremy Lu</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jatwork" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=jatwork" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ivan.dalmet.fr"><img src="https://avatars3.githubusercontent.com/u/9749061?s=460&v=4?s=64" width="64px;" alt="Ivan Dalmet"/><br /><sub><b>Ivan Dalmet</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ivan-dalmet" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=ivan-dalmet" title="Code">💻</a> <a href="#plugin-ivan-dalmet" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/illourr"><img src="https://avatars2.githubusercontent.com/u/1165331?s=460&u=5c3375b367f330bc036cee1b0dafd4f3325085d6&v=4?s=64" width="64px;" alt="Dillon Curry"/><br /><sub><b>Dillon Curry</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=illourr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sourcerer.io/blnk-space"><img src="https://avatars3.githubusercontent.com/u/13308108?s=460&u=57597abdffe28411c42608c72a4f37a2ca6e9e3f&v=4?s=64" width="64px;" alt="idfunctor"/><br /><sub><b>idfunctor</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=idfunctor" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/denkigai"><img src="https://avatars2.githubusercontent.com/u/14799020?s=460&u=2898cfe73d47ef43cc0ea8f05461393c8579c261&v=4?s=64" width="64px;" alt="denkigai"/><br /><sub><b>denkigai</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=denkigai" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/aaronadamsca"><img src="https://avatars2.githubusercontent.com/u/1505561?s=460&u=5157b9076e2372c79f0ec7e0cc084e447826895c&v=4?s=64" width="64px;" alt="Aaron Adams"/><br /><sub><b>Aaron Adams</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=aaronadamsCA" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://abdul.codes"><img src="https://avatars1.githubusercontent.com/u/31009679?s=460&u=9bb64ab616e010e0052acba0f49e5c9b85be4d2b&v=4?s=64" width="64px;" alt="Abdulazeez Adeshina"/><br /><sub><b>Abdulazeez Adeshina</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Youngestdev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://supersandro.de"><img src="https://avatars1.githubusercontent.com/u/7258858?s=460&u=c524720e2844ffa8a2aa67944fde5af54031e06d&v=4?s=64" width="64px;" alt="Sandro"/><br /><sub><b>Sandro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=SuperSandro2000" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Premkumar-Shanmugam"><img src="https://avatars1.githubusercontent.com/u/28890016?s=460&u=ebf9e083d3bfe95e271ae4fd78b1896814727c70&v=4?s=64" width="64px;" alt="Premkumar Shanmugam"/><br /><sub><b>Premkumar Shanmugam</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Premkumar-Shanmugam" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.tobias-meixner.com"><img src="https://avatars0.githubusercontent.com/u/2327615?s=460&v=4?s=64" width="64px;" alt="Tobias Meixner"/><br /><sub><b>Tobias Meixner</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=MeixnerTobias" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JeremieLeblanc"><img src="https://avatars0.githubusercontent.com/u/9596165?s=460&u=1ef150bf603ba987938b13ffc249dc42177b38c0&v=4?s=64" width="64px;" alt="Jeremie Leblanc"/><br /><sub><b>Jeremie Leblanc</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=JeremieLeblanc" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/dominus_kelvin"><img src="https://avatars3.githubusercontent.com/u/24433274?s=460&u=1c872d2e37185b3edf21c134b9149a5dcfd7c864&v=4?s=64" width="64px;" alt="Kelvin Oghenerhoro"/><br /><sub><b>Kelvin Oghenerhoro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=DominusKelvin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DavidJFelix"><img src="https://avatars2.githubusercontent.com/u/263432?s=460&u=262fb80ae1ee6c450f8fe705e646d72c8c3e1b0b&v=4?s=64" width="64px;" alt="David J. Felix"/><br /><sub><b>David J. Felix</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=DavidJFelix" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mrmckeb"><img src="https://avatars3.githubusercontent.com/u/5043083?v=4?s=64" width="64px;" alt="Brody McKee"/><br /><sub><b>Brody McKee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mrmckeb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Psvensso"><img src="https://avatars1.githubusercontent.com/u/1482833?v=4?s=64" width="64px;" alt="Per Svensson"/><br /><sub><b>Per Svensson</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Psvensso" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.patrickcason.com"><img src="https://avatars1.githubusercontent.com/u/1297930?v=4?s=64" width="64px;" alt="Patrick Cason"/><br /><sub><b>Patrick Cason</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=cereallarceny" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.ivoilic.com"><img src="https://avatars1.githubusercontent.com/u/3476570?v=4?s=64" width="64px;" alt="Ivo Ilić"/><br /><sub><b>Ivo Ilić</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ivoilic" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/avaneeshtripathi"><img src="https://avatars3.githubusercontent.com/u/20407975?v=4?s=64" width="64px;" alt="Avaneesh Tripathi"/><br /><sub><b>Avaneesh Tripathi</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=avaneeshtripathi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://habd.as"><img src="https://avatars3.githubusercontent.com/u/65664227?v=4?s=64" width="64px;" alt="balibebas"/><br /><sub><b>balibebas</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=balibebas" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://navin-moorthy.github.io/"><img src="https://avatars0.githubusercontent.com/u/39694575?v=4?s=64" width="64px;" alt="Navin Moorthy"/><br /><sub><b>Navin Moorthy</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=navin-moorthy" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=navin-moorthy" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.timkindberg.com"><img src="https://avatars0.githubusercontent.com/u/168046?v=4?s=64" width="64px;" alt="Tim Kindberg"/><br /><sub><b>Tim Kindberg</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=timkindberg" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/iodar"><img src="https://avatars3.githubusercontent.com/u/47027105?v=4?s=64" width="64px;" alt="iodar"/><br /><sub><b>iodar</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=iodar" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lcdsmao.dev"><img src="https://avatars3.githubusercontent.com/u/13031690?v=4?s=64" width="64px;" alt="MAO YUFENG"/><br /><sub><b>MAO YUFENG</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lcdsmao" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jiepeng.me"><img src="https://avatars3.githubusercontent.com/u/10325111?v=4?s=64" width="64px;" alt="Peng Jie"/><br /><sub><b>Peng Jie</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=neighborhood999" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=neighborhood999" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Geeman201"><img src="https://avatars3.githubusercontent.com/u/1285296?v=4?s=64" width="64px;" alt="James Gee"/><br /><sub><b>James Gee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Geeman201" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=Geeman201" title="Tests">⚠️</a> <a href="#example-Geeman201" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/antonjb"><img src="https://avatars2.githubusercontent.com/u/1066856?v=4?s=64" width="64px;" alt="Anton"/><br /><sub><b>Anton</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=antonjb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/damnjan"><img src="https://avatars2.githubusercontent.com/u/2204518?v=4?s=64" width="64px;" alt="Damnjan Lukovic"/><br /><sub><b>Damnjan Lukovic</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=damnjan" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Andu033"><img src="https://avatars1.githubusercontent.com/u/15851201?v=4?s=64" width="64px;" alt="Stanila Andrei"/><br /><sub><b>Stanila Andrei</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Andu033" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ezekielekunola.com"><img src="https://avatars0.githubusercontent.com/u/24660100?v=4?s=64" width="64px;" alt="Ekunola Ezekiel"/><br /><sub><b>Ekunola Ezekiel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Easybuoy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mitchinson.dev"><img src="https://avatars2.githubusercontent.com/u/33632286?v=4?s=64" width="64px;" alt="Ben Mitchinson"/><br /><sub><b>Ben Mitchinson</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=bmitchinson" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jes.st/about"><img src="https://avatars1.githubusercontent.com/u/612020?v=4?s=64" width="64px;" alt="Jess Telford"/><br /><sub><b>Jess Telford</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jesstelford" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://simo.sh"><img src="https://avatars1.githubusercontent.com/u/1344906?v=4?s=64" width="64px;" alt="Simo Aleksandrov"/><br /><sub><b>Simo Aleksandrov</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=fr3fou" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hericl.es"><img src="https://avatars2.githubusercontent.com/u/30700596?v=4?s=64" width="64px;" alt="Héricles Emanuel"/><br /><sub><b>Héricles Emanuel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=hericlesme" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/CodinCat"><img src="https://avatars3.githubusercontent.com/u/3193344?v=4?s=64" width="64px;" alt="CodinCat"/><br /><sub><b>CodinCat</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=CodinCat" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://samdawson.dev"><img src="https://avatars0.githubusercontent.com/u/13163834?v=4?s=64" width="64px;" alt="Sam Dawson"/><br /><sub><b>Sam Dawson</b></sub></a><br /><a href="#ideas-Samic8" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hy2k"><img src="https://avatars3.githubusercontent.com/u/17329720?v=4?s=64" width="64px;" alt="hy2k"/><br /><sub><b>hy2k</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=hy2k" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://loud.gg"><img src="https://avatars0.githubusercontent.com/u/5843816?v=4?s=64" width="64px;" alt="Pierre Ortega"/><br /><sub><b>Pierre Ortega</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=PierreAndreis" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://keremciu.github.io/"><img src="https://avatars0.githubusercontent.com/u/1593488?v=4?s=64" width="64px;" alt="Kerem Sevencan"/><br /><sub><b>Kerem Sevencan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=keremciu" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/harveyhalwin"><img src="https://avatars2.githubusercontent.com/u/41739034?v=4?s=64" width="64px;" alt="harveyhalwin"/><br /><sub><b>harveyhalwin</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=harveyhalwin" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://benyou.me"><img src="https://avatars3.githubusercontent.com/u/31636863?v=4?s=64" width="64px;" alt="Mansour benyoucef"/><br /><sub><b>Mansour benyoucef</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=benyou1969" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://atgarrison.com"><img src="https://avatars1.githubusercontent.com/u/11062725?v=4?s=64" width="64px;" alt="Andrew Garrison"/><br /><sub><b>Andrew Garrison</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=andrewgarrison" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://carlosvini.github.io/"><img src="https://avatars2.githubusercontent.com/u/4670443?v=4?s=64" width="64px;" alt="Carlos Rodrigues"/><br /><sub><b>Carlos Rodrigues</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=carlosvini" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.dwightwatson.com"><img src="https://avatars3.githubusercontent.com/u/1100408?v=4?s=64" width="64px;" alt="Dwight Watson"/><br /><sub><b>Dwight Watson</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dwightwatson" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ChasinHues"><img src="https://avatars1.githubusercontent.com/u/13565648?v=4?s=64" width="64px;" alt="ChasinHues"/><br /><sub><b>ChasinHues</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ChasinHues" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nahuel"><img src="https://avatars0.githubusercontent.com/u/15200?v=4?s=64" width="64px;" alt="Nahuel Greco"/><br /><sub><b>Nahuel Greco</b></sub></a><br /><a href="#projectManagement-nahuel" title="Project Management">📆</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Anahuel" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://pablorocha.me"><img src="https://avatars1.githubusercontent.com/u/11415340?v=4?s=64" width="64px;" alt="Pablo Rocha"/><br /><sub><b>Pablo Rocha</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=joserocha3" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dlarimer.com"><img src="https://avatars1.githubusercontent.com/u/180438?v=4?s=64" width="64px;" alt="Dustin Larimer"/><br /><sub><b>Dustin Larimer</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dustinlarimer" title="Code">💻</a> <a href="#design-dustinlarimer" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://frontendwizard.dev"><img src="https://avatars1.githubusercontent.com/u/1124448?v=4?s=64" width="64px;" alt="Juliano Farias"/><br /><sub><b>Juliano Farias</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=frontendwizard" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://joebell.co.uk"><img src="https://avatars3.githubusercontent.com/u/7349341?v=4?s=64" width="64px;" alt="Joe Bell"/><br /><sub><b>Joe Bell</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Ajoe-bell" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=joe-bell" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://henningpohlmeyer.com"><img src="https://avatars0.githubusercontent.com/u/6564077?v=4?s=64" width="64px;" alt="Henning Pohlmeyer"/><br /><sub><b>Henning Pohlmeyer</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=hpohlmeyer" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sivertschou"><img src="https://avatars3.githubusercontent.com/u/31168035?v=4?s=64" width="64px;" alt="Sivert Schou Olsen"/><br /><sub><b>Sivert Schou Olsen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=sivertschou" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lazandrei19"><img src="https://avatars1.githubusercontent.com/u/3816519?v=4?s=64" width="64px;" alt="Andrei Lazarescu"/><br /><sub><b>Andrei Lazarescu</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lazandrei19" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jrrmt"><img src="https://avatars3.githubusercontent.com/u/44125?v=4?s=64" width="64px;" alt="José Teixeira"/><br /><sub><b>José Teixeira</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Ajrrmt" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.adrianoresende.com.br"><img src="https://avatars1.githubusercontent.com/u/798755?v=4?s=64" width="64px;" alt="Adriano Resende"/><br /><sub><b>Adriano Resende</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=adrianoresende" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://victorwpbastos.github.io"><img src="https://avatars3.githubusercontent.com/u/1017515?v=4?s=64" width="64px;" alt="Victor Bastos"/><br /><sub><b>Victor Bastos</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=victorwpbastos" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zaynex"><img src="https://avatars0.githubusercontent.com/u/13745971?v=4?s=64" width="64px;" alt="Vincent"/><br /><sub><b>Vincent</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Zaynex" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.candiceczech.com"><img src="https://avatars0.githubusercontent.com/u/25373313?v=4?s=64" width="64px;" alt="Candice"/><br /><sub><b>Candice</b></sub></a><br /><a href="#design-candicecz" title="Design">🎨</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Acandicecz" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=candicecz" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://davebauman.io"><img src="https://avatars3.githubusercontent.com/u/3084806?v=4?s=64" width="64px;" alt="Dave Bauman"/><br /><sub><b>Dave Bauman</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=baumandm" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TimKolberger"><img src="https://avatars2.githubusercontent.com/u/16899513?v=4?s=64" width="64px;" alt="TimKolberger"/><br /><sub><b>TimKolberger</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3ATimKolberger" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=TimKolberger" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=TimKolberger" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/_waptik"><img src="https://avatars1.githubusercontent.com/u/1687551?v=4?s=64" width="64px;" alt="Stephane Mensah"/><br /><sub><b>Stephane Mensah</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Awaptik" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/iskanderbroere"><img src="https://avatars2.githubusercontent.com/u/25477294?v=4?s=64" width="64px;" alt="iskanderbroere"/><br /><sub><b>iskanderbroere</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=iskanderbroere" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dominik.sumer.dev"><img src="https://avatars3.githubusercontent.com/u/4418879?v=4?s=64" width="64px;" alt="Dominik Sumer"/><br /><sub><b>Dominik Sumer</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dsumer" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.strajk.me"><img src="https://avatars3.githubusercontent.com/u/697301?v=4?s=64" width="64px;" alt="Pavel 'Strajk' Dolecek"/><br /><sub><b>Pavel 'Strajk' Dolecek</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Strajk" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/keshav-bohra-17032753/"><img src="https://avatars3.githubusercontent.com/u/44581314?v=4?s=64" width="64px;" alt="Keshav Bohra"/><br /><sub><b>Keshav Bohra</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=keshav-bohr" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/okezieuc"><img src="https://avatars3.githubusercontent.com/u/53785400?v=4?s=64" width="64px;" alt="okezieuc"/><br /><sub><b>okezieuc</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=okezieuc" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/claytonfaria"><img src="https://avatars1.githubusercontent.com/u/65756578?v=4?s=64" width="64px;" alt="Clayton Faria"/><br /><sub><b>Clayton Faria</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=claytonfaria" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ellisio"><img src="https://avatars1.githubusercontent.com/u/127468?v=4?s=64" width="64px;" alt="Andrew Ellis"/><br /><sub><b>Andrew Ellis</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ellisio" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Aellisio" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=ellisio" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://joelgallant.me"><img src="https://avatars3.githubusercontent.com/u/1429994?v=4?s=64" width="64px;" alt="Joel Gallant"/><br /><sub><b>Joel Gallant</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Ajoelgallant" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jkrishna.dev"><img src="https://avatars0.githubusercontent.com/u/11075561?v=4?s=64" width="64px;" alt="Jaya Krishna Namburu"/><br /><sub><b>Jaya Krishna Namburu</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=JayaKrishnaNamburu" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ifeoma-imoh"><img src="https://avatars2.githubusercontent.com/u/60473225?v=4?s=64" width="64px;" alt="Ifeoma Imoh"/><br /><sub><b>Ifeoma Imoh</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ifeoma-imoh" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jasonadkison"><img src="https://avatars3.githubusercontent.com/u/744333?v=4?s=64" width="64px;" alt="Jason Adkison"/><br /><sub><b>Jason Adkison</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Ajasonadkison" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gauthierrodaro.com"><img src="https://avatars1.githubusercontent.com/u/6961490?v=4?s=64" width="64px;" alt="Gauthier Rodaro"/><br /><sub><b>Gauthier Rodaro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Agauthierrodaro" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tomdohnal"><img src="https://avatars2.githubusercontent.com/u/22922179?v=4?s=64" width="64px;" alt="Tom Dohnal"/><br /><sub><b>Tom Dohnal</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tomdohnal" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://margalit.com.au"><img src="https://avatars0.githubusercontent.com/u/2268424?v=4?s=64" width="64px;" alt="Sam Margalit"/><br /><sub><b>Sam Margalit</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Amargalit" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://marcuswood.io"><img src="https://avatars0.githubusercontent.com/u/13633613?v=4?s=64" width="64px;" alt="Marcus Wood"/><br /><sub><b>Marcus Wood</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mwood23" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SpencerDuball"><img src="https://avatars0.githubusercontent.com/u/22606045?v=4?s=64" width="64px;" alt="Spencer Duball"/><br /><sub><b>Spencer Duball</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=SpencerDuball" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://jacobarriola.com"><img src="https://avatars0.githubusercontent.com/u/1371573?v=4?s=64" width="64px;" alt="Jacob Arriola"/><br /><sub><b>Jacob Arriola</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jacobarriola" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jkenley.me"><img src="https://avatars0.githubusercontent.com/u/8725648?v=4?s=64" width="64px;" alt="Kenley Jean"/><br /><sub><b>Kenley Jean</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=bedjiken" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://morello.dev"><img src="https://avatars0.githubusercontent.com/u/19588613?v=4?s=64" width="64px;" alt="Dennis Morello"/><br /><sub><b>Dennis Morello</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Adennismorello" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://umarcodes.xyz/"><img src="https://avatars2.githubusercontent.com/u/20203468?v=4?s=64" width="64px;" alt="Umar Gora"/><br /><sub><b>Umar Gora</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=umxr" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zyclotrop-j"><img src="https://avatars0.githubusercontent.com/u/4939546?v=4?s=64" width="64px;" alt="Zyclotrop-j"/><br /><sub><b>Zyclotrop-j</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=Zyclotrop-j" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/milescm"><img src="https://avatars1.githubusercontent.com/u/33818414?v=4?s=64" width="64px;" alt="Hong Suk Woo"/><br /><sub><b>Hong Suk Woo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=milescm" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://trendy-resume.now.sh/"><img src="https://avatars2.githubusercontent.com/u/32605822?v=4?s=64" width="64px;" alt="Junho Yeo"/><br /><sub><b>Junho Yeo</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=junhoyeo" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://silltho.github.io/"><img src="https://avatars0.githubusercontent.com/u/5812228?v=4?s=64" width="64px;" alt="Thomas Siller"/><br /><sub><b>Thomas Siller</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=silltho" title="Tests">⚠️</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=silltho" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tyneo.net/fr/"><img src="https://avatars2.githubusercontent.com/u/1290679?v=4?s=64" width="64px;" alt="Samuel Kauffmann"/><br /><sub><b>Samuel Kauffmann</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=skauffmann" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dodas"><img src="https://avatars0.githubusercontent.com/u/14360171?v=4?s=64" width="64px;" alt="Jozef Mikuláš"/><br /><sub><b>Jozef Mikuláš</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dodas" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jvmazagao"><img src="https://avatars2.githubusercontent.com/u/22477816?v=4?s=64" width="64px;" alt="João Victor "/><br /><sub><b>João Victor </b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jvmazagao" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yicru"><img src="https://avatars3.githubusercontent.com/u/37892222?v=4?s=64" width="64px;" alt="yuichiro miyamae"/><br /><sub><b>yuichiro miyamae</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=yicru" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@gifa.eriyanto"><img src="https://avatars0.githubusercontent.com/u/6601377?v=4?s=64" width="64px;" alt="Gifa Eriyanto"/><br /><sub><b>Gifa Eriyanto</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Agifaeriyanto" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yuzima"><img src="https://avatars2.githubusercontent.com/u/6914393?v=4?s=64" width="64px;" alt="Yuzi"/><br /><sub><b>Yuzi</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=yuzima" title="Tests">⚠️</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=yuzima" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/songheewon"><img src="https://avatars1.githubusercontent.com/u/44194990?v=4?s=64" width="64px;" alt="songheewon"/><br /><sub><b>songheewon</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=songheewon" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vipranarayan14"><img src="https://avatars2.githubusercontent.com/u/17687018?v=4?s=64" width="64px;" alt="Prasanna Venkatesh T S"/><br /><sub><b>Prasanna Venkatesh T S</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=vipranarayan14" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anthowm"><img src="https://avatars3.githubusercontent.com/u/5764698?v=4?s=64" width="64px;" alt="anthowm"/><br /><sub><b>anthowm</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=anthowm" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/oahmaro"><img src="https://avatars1.githubusercontent.com/u/15835932?v=4?s=64" width="64px;" alt="Osama Ahmaro"/><br /><sub><b>Osama Ahmaro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Aoahmaro" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dananw"><img src="https://avatars1.githubusercontent.com/u/31610272?v=4?s=64" width="64px;" alt="Danan Wijaya"/><br /><sub><b>Danan Wijaya</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dananw" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/electather"><img src="https://avatars2.githubusercontent.com/u/33129195?v=4?s=64" width="64px;" alt="electather"/><br /><sub><b>electather</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Aelectather" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shubham-kaushal"><img src="https://avatars3.githubusercontent.com/u/63925481?v=4?s=64" width="64px;" alt="Shubham Kaushal"/><br /><sub><b>Shubham Kaushal</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=shubham-kaushal" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/petter"><img src="https://avatars0.githubusercontent.com/u/25374940?v=4?s=64" width="64px;" alt="Petter Sæther Moen"/><br /><sub><b>Petter Sæther Moen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=petter" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nygaard.dev"><img src="https://avatars3.githubusercontent.com/u/20663884?v=4?s=64" width="64px;" alt="Herman Nygaard"/><br /><sub><b>Herman Nygaard</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=HermanNygaard" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jnmsl"><img src="https://avatars0.githubusercontent.com/u/44583047?v=4?s=64" width="64px;" alt="jnmsl"/><br /><sub><b>jnmsl</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jnmsl" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MohamedSayed008"><img src="https://avatars3.githubusercontent.com/u/23707834?v=4?s=64" width="64px;" alt="Mohamed Sayed"/><br /><sub><b>Mohamed Sayed</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=MohamedSayed008" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sampoder.com"><img src="https://avatars3.githubusercontent.com/u/39828164?v=4?s=64" width="64px;" alt="Sam Poder"/><br /><sub><b>Sam Poder</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=sampoder" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dominictwlee"><img src="https://avatars2.githubusercontent.com/u/34794189?v=4?s=64" width="64px;" alt="Dominic Lee"/><br /><sub><b>Dominic Lee</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=dominictwlee" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=dominictwlee" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/ferasaloudah"><img src="https://avatars1.githubusercontent.com/u/45723438?v=4?s=64" width="64px;" alt="Feras Aloudah"/><br /><sub><b>Feras Aloudah</b></sub></a><br /><a href="#ideas-FerasAloudah" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://jungaretti.com"><img src="https://avatars.githubusercontent.com/u/19893438?v=4?s=64" width="64px;" alt="JP Ungaretti"/><br /><sub><b>JP Ungaretti</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=jungaretti" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eintxaurtieta"><img src="https://avatars.githubusercontent.com/u/24615080?v=4?s=64" width="64px;" alt="Endika Intxaurtieta"/><br /><sub><b>Endika Intxaurtieta</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=eintxaurtieta" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mattwells19"><img src="https://avatars.githubusercontent.com/u/36650048?v=4?s=64" width="64px;" alt="Matt Wells"/><br /><sub><b>Matt Wells</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mattwells19" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://anantja.in"><img src="https://avatars.githubusercontent.com/u/509059?v=4?s=64" width="64px;" alt="Anant Jain"/><br /><sub><b>Anant Jain</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=anantja-in" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@tomchentw"><img src="https://avatars.githubusercontent.com/u/922234?v=4?s=64" width="64px;" alt="Tom Chen"/><br /><sub><b>Tom Chen</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=tomchentw" title="Documentation">📖</a> <a href="#infra-tomchentw" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/emiranda04"><img src="https://avatars.githubusercontent.com/u/11409613?v=4?s=64" width="64px;" alt="Ernie Miranda"/><br /><sub><b>Ernie Miranda</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=emiranda04" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bjoluc"><img src="https://avatars.githubusercontent.com/u/25661029?v=4?s=64" width="64px;" alt="bjoluc"/><br /><sub><b>bjoluc</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=bjoluc" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/psujit"><img src="https://avatars.githubusercontent.com/u/17481888?v=4?s=64" width="64px;" alt="Sujit Pradhan"/><br /><sub><b>Sujit Pradhan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=psujit" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=psujit" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://abhishekashyap.tech/"><img src="https://avatars.githubusercontent.com/u/29458374?v=4?s=64" width="64px;" alt="Abhishek Kashyap"/><br /><sub><b>Abhishek Kashyap</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=abhishekashyap" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kristian240"><img src="https://avatars.githubusercontent.com/u/55184443?v=4?s=64" width="64px;" alt="Kristian Djaković"/><br /><sub><b>Kristian Djaković</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=kristian240" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/antoniel"><img src="https://avatars.githubusercontent.com/u/17225358?v=4?s=64" width="64px;" alt="Antoniel Magalhães"/><br /><sub><b>Antoniel Magalhães</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=antoniel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://griko.id"><img src="https://avatars.githubusercontent.com/u/8220954?v=4?s=64" width="64px;" alt="Griko Nibras"/><br /><sub><b>Griko Nibras</b></sub></a><br /><a href="#ideas-grikomsn" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=grikomsn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/imalbert"><img src="https://avatars.githubusercontent.com/u/12537973?v=4?s=64" width="64px;" alt="imalbert"/><br /><sub><b>imalbert</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=imalbert" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mcha-dev"><img src="https://avatars.githubusercontent.com/u/13101565?v=4?s=64" width="64px;" alt="mcha"/><br /><sub><b>mcha</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=mcha-dev" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=mcha-dev" title="Tests">⚠️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://hasibhassan.com"><img src="https://avatars.githubusercontent.com/u/67892792?v=4?s=64" width="64px;" alt="Hasib Hassan"/><br /><sub><b>Hasib Hassan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=hasibhassan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jamie.rolfs.sh"><img src="https://avatars.githubusercontent.com/u/288160?v=4?s=64" width="64px;" alt="Jamie Rolfs"/><br /><sub><b>Jamie Rolfs</b></sub></a><br /><a href="#ideas-jrolfs" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=jrolfs" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=jrolfs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/spidertwin2"><img src="https://avatars.githubusercontent.com/u/29196888?v=4?s=64" width="64px;" alt="Surabhi Gupta"/><br /><sub><b>Surabhi Gupta</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=spidertwin2" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://rp.station.msk.ru"><img src="https://avatars.githubusercontent.com/u/23503775?v=4?s=64" width="64px;" alt="Ningaro"/><br /><sub><b>Ningaro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3ANingaro" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://monae.me"><img src="https://avatars.githubusercontent.com/u/74229895?v=4?s=64" width="64px;" alt="Monae"/><br /><sub><b>Monae</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=m0nae" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wadewadewadewadewadewade"><img src="https://avatars.githubusercontent.com/u/23270394?v=4?s=64" width="64px;" alt="Wade McDaniel"/><br /><sub><b>Wade McDaniel</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=wadewadewadewadewadewade" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MasterGordon"><img src="https://avatars.githubusercontent.com/u/18127395?v=4?s=64" width="64px;" alt="Gordon Goldbach"/><br /><sub><b>Gordon Goldbach</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=MasterGordon" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bhishp"><img src="https://avatars.githubusercontent.com/u/12024258?v=4?s=64" width="64px;" alt="Bhish"/><br /><sub><b>Bhish</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=bhishp" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://amilkar.dev"><img src="https://avatars.githubusercontent.com/u/71573508?v=4?s=64" width="64px;" alt="Amilkar Munoz"/><br /><sub><b>Amilkar Munoz</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=soloamilkar" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://book-worm-1.herokuapp.com/"><img src="https://avatars.githubusercontent.com/u/71091489?v=4?s=64" width="64px;" alt="Samar Mohan"/><br /><sub><b>Samar Mohan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=samarmohan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://joaopaulo-developer.vercel.app/"><img src="https://avatars.githubusercontent.com/u/64229622?v=4?s=64" width="64px;" alt="João Paulo Rodrigues"/><br /><sub><b>João Paulo Rodrigues</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=joaorodrs" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://develmonk.com"><img src="https://avatars.githubusercontent.com/u/1308847?v=4?s=64" width="64px;" alt="Avery Freeman"/><br /><sub><b>Avery Freeman</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=averyfreeman" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://schulz.codes"><img src="https://avatars.githubusercontent.com/u/3123354?v=4?s=64" width="64px;" alt="Daniel Schulz"/><br /><sub><b>Daniel Schulz</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Atakethefake" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=takethefake" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=takethefake" title="Documentation">📖</a> <a href="#ideas-takethefake" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://michaelkilbane.com"><img src="https://avatars.githubusercontent.com/u/21234729?v=4?s=64" width="64px;" alt="Michael Kilbane"/><br /><sub><b>Michael Kilbane</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=MichaelKilbane" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://ngxcoder.dev/"><img src="https://avatars.githubusercontent.com/u/87735757?v=4?s=64" width="64px;" alt="ngxCoder"/><br /><sub><b>ngxCoder</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=ngxCoder" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.selbekk.io"><img src="https://avatars.githubusercontent.com/u/1307267?v=4?s=64" width="64px;" alt="Kristofer Giltvedt Selbekk"/><br /><sub><b>Kristofer Giltvedt Selbekk</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=selbekk" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://johann-ehlers.eu"><img src="https://avatars.githubusercontent.com/u/21695702?v=4?s=64" width="64px;" alt="Johann Ehlers"/><br /><sub><b>Johann Ehlers</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=noobinthisgame" title="Documentation">📖</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=noobinthisgame" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lukasbach.com"><img src="https://avatars.githubusercontent.com/u/4140121?v=4?s=64" width="64px;" alt="Lukas Bach"/><br /><sub><b>Lukas Bach</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=lukasbach" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nikolovlazar.com"><img src="https://avatars.githubusercontent.com/u/5396211?v=4?s=64" width="64px;" alt="Lazar Nikolov"/><br /><sub><b>Lazar Nikolov</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Anikolovlazar" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://iwata.love"><img src="https://avatars.githubusercontent.com/u/7393198?v=4?s=64" width="64px;" alt="iwata"/><br /><sub><b>iwata</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/issues?q=author%3Aishowta" title="Bug reports">🐛</a> <a href="https://github.com/chakra-ui/chakra-ui/commits?author=ishowta" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://shining-cerise-a8f.notion.site/Crispy-4f6d4f0c15d64b9abfdaf73a0dffdf63"><img src="https://avatars.githubusercontent.com/u/29042329?v=4?s=64" width="64px;" alt="Lee seung chan"/><br /><sub><b>Lee seung chan</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=heozeop" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pomSense"><img src="https://avatars.githubusercontent.com/u/35952778?v=4?s=64" width="64px;" alt="pomSense"/><br /><sub><b>pomSense</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=pomSense" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/be-student"><img src="https://avatars.githubusercontent.com/u/80899085?v=4?s=64" width="64px;" alt="be-student"/><br /><sub><b>be-student</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=be-student" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://itkrt2y.dev"><img src="https://avatars.githubusercontent.com/u/2343568?v=4?s=64" width="64px;" alt="Tatsuya Itakura"/><br /><sub><b>Tatsuya Itakura</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=itkrt2y" title="Code">💻</a> <a href="#maintenance-itkrt2y" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://yuku.dev"><img src="https://avatars.githubusercontent.com/u/16265411?v=4?s=64" width="64px;" alt="Yuku Kotani"/><br /><sub><b>Yuku Kotani</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=yukukotani" title="Code">💻</a> <a href="#maintenance-yukukotani" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://vadimdemedes.com"><img src="https://avatars.githubusercontent.com/u/697676?v=4?s=64" width="64px;" alt="Vadim Demedes"/><br /><sub><b>Vadim Demedes</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui/commits?author=vadimdemedes" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

([emoji key](https://allcontributors.org/docs/en/emoji-key)):

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## Testing supported by

<img width="200" src="https://i.imgur.com/eeuDARI.png" alt="BrowserStack"/>

## License

MIT © [Segun Adebayo](https://github.com/segunadebayo)
