Thanks for showing interest to contribute to Chakra UI 💖, you rock!

## Overview

Here are a few ways you can help improve Chakra UI

- **Improve the documentation**: Add new demos, fix typos, or add missing
  information.
- **Add new demos**: Add new component demos to the website and storybook. Open
  a PR to `apps/compositions/src/examples`
- **Fix bugs**: Report bugs, fix bugs, or add missing features.
- **Contribute to the code**: Propose new features by opening a Github
  Discussion, or find existing bugs to work on.
- **Improve the code**: Improve the code, fix bugs, or add missing features.

> We welcome all contributions, no matter how big or small.

## Architecture

Chakra v3.x is a composition of two projects in the Chakra ecosystem, Ark UI and
Zag.js. The goal is to maintain as little code as possible in Chakra UI, and
delegate the heavy lifting to these projects.

### Filing Issues

The mindset for filing issues on Chakra v3.x works like this:

- If the issue is a logic or accessibility bug, then it's most likely a bug in
  Zag.js. Consider opening an issue in the Zag.js repository.

- If it's a styling issue, then you can fix it directly in the Chakra UI repo.

### Feature Requests

The mindset for filing feature requests on Chakra v3.x works like this:

- If the feature is a new component without logic, then it can go in Chakra UI
  or Ark UI. Start a discussion on the
  [Chakra UI repository](https://github.com/chakra-ui/chakra-ui)

- If the feature is a new component with logic, it belongs in Zag.js. Start a
  discussion on the [Zag.js repository](https://github.com/chakra-ui/zag).

## Local Setup

- Clone the repository

```bash
git clone https://github.com/chakra-ui/chakra-ui.git
```

- Install dependencies with pnpm

```bash
pnpm install
```

- Build local version of all packages

```bash
pnpm build:fast
```

- Start storybook

```bash
pnpm storybook
```

- Start documentation website

```bash
pnpm www dev
```

- Run tests

```bash
pnpm test
```

## Recommended Extensions

We recommend using the following extensions in your editor:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [MDX](https://mdxjs.com/)
