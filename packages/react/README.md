# @chakra-ui/react

[![npm version](https://npmx.dev/api/registry/badge/version/@chakra-ui/react)](https://npmx.dev/package/@chakra-ui/react)
[![npm downloads](https://npmx.dev/api/registry/badge/downloads/@chakra-ui/react)](https://npmx.dev/package/@chakra-ui/react)
[![types](https://npmx.dev/api/registry/badge/types/@chakra-ui/react)](https://npmx.dev/package/@chakra-ui/react)
[![license](https://npmx.dev/api/registry/badge/license/@chakra-ui/react)](https://github.com/chakra-ui/chakra-ui/blob/main/LICENSE)

Chakra UI is a component system for building products with speed. Accessible
React components for building high-quality web apps and design systems. Works
with Next.js RSC.

- **Works out of the box.** A set of polished React components with sensible
  defaults.
- **Flexible & composable.** Components are built on top of headless UI
  primitives ([Ark UI](https://ark-ui.com)) for endless composability.
- **Accessible.** Components follow the WAI-ARIA guidelines and are tested
  against common accessibility issues.
- **Themeable.** Customize every part of the components with design tokens,
  recipes, and semantic tokens. Dark mode included.

## Documentation

https://chakra-ui.com

- Latest: https://chakra-ui.com
- v2: https://v2.chakra-ui.com
- v1: https://v1.chakra-ui.com

## Installation

Install the `@chakra-ui/react` package and its peer dependency:

```sh
# with npm
npm i @chakra-ui/react @emotion/react

# with yarn
yarn add @chakra-ui/react @emotion/react

# with pnpm
pnpm add @chakra-ui/react @emotion/react

# with bun
bun add @chakra-ui/react @emotion/react
```

## Getting started

1. Wrap your application with the `ChakraProvider` component:

```tsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

export const App = ({ children }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)
```

2. Start using components:

```tsx
import { Button } from "@chakra-ui/react"

const Demo = () => <Button>I just consumed some ⚡️Chakra!</Button>
```

For framework-specific setup (Next.js, Vite, etc.), see the
[installation guide](https://chakra-ui.com/docs/get-started/installation).

## Contributing

Feel like contributing? That's awesome! Read the
[contribution guide](https://chakra-ui.com/docs/get-started/contributing) to get
started.

## License

MIT © [Segun Adebayo](https://github.com/segunadebayo)
