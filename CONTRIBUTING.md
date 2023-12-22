Thanks for showing interest to contribute to Chakra UI 💖, you rock!

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

## Setup the Project

The following steps will get you up and running to contribute to Chakra UI:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/chakra-ui/chakra-ui))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/chakra-ui.git
cd chakra-ui
```

3. Setup all the dependencies and packages by running `pnpm install`. This
   command will install dependencies.

> If you run into any issues during this step, kindly reach out to the Chakra UI
> React team here: https://discord.gg/chakra-ui

## Development

To improve our development process, we've set up tooling and systems. Chakra UI
uses a monorepo structure and we treat each component as an independent package
that can be consumed in isolation.

### Tooling

- [PNPM](https://pnpm.io/) to manage packages and dependencies
- [Storybook](https://storybook.js.org/) for rapid UI component development and
  testing
- [Testing Library](https://testing-library.com/) for testing components and
  hooks
- [Changeset](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.

### Commands

**`pnpm install`**: bootstraps the entire project, symlinks all dependencies for
cross-component development and builds all components.

**`pnpm dev`**: Runs the build and watch command for all component packages.

**`pnpm storybook`**: starts storybook server and loads stories in files that
end with `.stories.tsx`.

**`pnpm build`**: run build for all component packages.

**`pnpm test`**: run test for all component packages.

**`pnpm release`**: publish changed packages.

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

You may wish to use our starters to help you get going:

- JavaScript Starter: https://codesandbox.io/s/chakra-ui-javascript-lzzg9
- TypeScript Starter: https://codesandbox.io/s/chakra-ui-typescript-pomi8

## Proposing new or changed API?

Please provide thoughtful comments and some sample API code. Proposals that
don't line up with our roadmap or don't have a thoughtful explanation will be
closed.

## Making a Pull Request?

Pull requests need only the :+1: of two or more collaborators to be merged; when
the PR author is a collaborator, that counts as one.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the chakra-ui repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/chakra-ui/chakra-ui/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `pnpm pkg <module> build` and
   `pnpm pkg <module> test` to make sure everything works as expected. Please
   note that you might have to run `pnpm boot` first in order to build all
   dependencies.

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.
5. Also, if you provide `jsx` snippets to the changeset, please turn off the
   live preview by doing the following at the beginning of the snippet:
   ` ```jsx live=false`

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

### Tests

All commits that fix bugs or add features need a test.

> **Dear Chakra team:** Please do not merge code without tests

## Want to write a blog post or tutorial

That would be amazing! Reach out to the core team here:
https://discord.gg/chakra-ui. We would love to support you any way we can.

## Want to help improve the docs?

Our docsite lives in a
[separate repo](https://github.com/chakra-ui/chakra-ui-docs). If you're
interested in contributing to the documentation, check out the
[docsite contribution guide](https://github.com/chakra-ui/chakra-ui-docs/blob/main/CONTRIBUTING.md).

## License

By contributing your code to the chakra-ui GitHub repository, you agree to
license your contribution under the MIT license.
