Thanks for showing interest to contribute to Chakra UI 💖, you rock!

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

Here's the table of contents:

- [Setup the Project](#setup-the-project)
  - [Commands](#commands)
- [Updating the docs for new release](#updating-the-docs-for-new-release)
  - [Commit Convention](#commit-convention)
  - [Steps to PR](#steps-to-pr)
- [Want to write a blog post or tutorial](#want-to-write-a-blog-post-or-tutorial)
- [Want to help improve the docs?](#want-to-help-improve-the-docs)
- [License](#license)

## Setup the Project

Setting up the docsite project is easy. It's a Next.js site. The following steps
will get you up and running to contribute to the Chakra UI docsite:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/chakra-ui/chakra-ui-docs))

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/chakra-ui-docs.git
cd chakra-ui-docs
```

3. Setup all the dependencies and packages by running `pnpm i`.

4. Execute `pnpm dev` to spin up a local development server. If you're running
   Windows, contentlayer might not work as expected, so you'd need to do
   `npx contentlayer build` before running `pnpm dev` in order to generate the
   docsite content.

> If you run into any issues, kindly reach out to the Chakra UI React team here:
> https://discord.gg/chakra-ui

### Commands

**`pnpm`**: installs the dependency packages.

**`pnpm dev`**: starts the local development server.

**`pnpm build`**: builds the docsite for production.

**`pnpm lint`**: runs the nextjs linter which checks for code issues.

**`pnpm website dev`**: runs the docsite in development mode.

**`pnpm avatars:gen`**: regenerates the avatars

**`pnpm members:gen`**: regenerates the members

**`pnpm former-members:gen`**: regenerates the former members

**`pnpm search-meta:gen`**: regenerates the search meta

**`pnpm showcase-data:gen`**: regenerates the showcase data

**`pnpm changelog:gen`**: regenerates the Changelog

**`pnpm cache:clean`**: deletes the `.contentlayer` folder

**`pnpm clean`**: deletes the `pnpm.lock` file and `node_modules`

**`pnpm reinstall`**: reinstalls the dependency packages

## Updating the docs for new release

When a new version of `@chakra-ui/react` has been released, here's what you need
to do to get it reflected in the docs:

- Bump the version of `@chakra-ui/react`
- Run `pnpm changelog:gen` to fetch the most recent changelog from the
  [main repository](https://github.com/chakra-ui/chakra-ui)
- Open a Pull Request titled `docs: updates for new release`

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the chakra-ui-docs repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/chakra-ui/chakra-ui-docs/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `pnpm lint` to make sure everything works as
   expected. Please note that you might have to run `pnpm` first in order to
   install all dependencies.

## Want to write a blog post or tutorial

That would be amazing! Reach out to the core team here:
https://discord.gg/chakra-ui. We would love to support you any way we can.

## Want to help improve the docs?

By default, the GitHub REST API has an anonymous user rate limit. This can be
hit during heavy local docs development if the server is frequently restarted.

Creating a GitHub token and storing it as the `GITHUB_TOKEN` environment
variable allows the user to avoid the limit.

Visit
https://github.com/settings/tokens/new?description=Chakra+website+development to
create a new personal access token. After creating the token, be sure to copy
the token string to your clipboard.

You'll then run the following command in the terminal at the root of the
project:

```sh
echo "GITHUB_TOKEN=<PASTE YOUR TOKEN HERE>" >> .env
```

> The `.env` file is already ignored by git.

## License

By contributing your code to the chakra-ui-docs GitHub repository, you agree to
license your contribution under the MIT license.\*\*\*\*
